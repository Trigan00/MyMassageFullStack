const firebase = require("firebase-admin");
const { YooCheckout } = require("@a2seven/yoo-checkout");
const { db } = require("../firebase");
const Router = require("express");
const uuid = require("uuid");
const router = new Router();

const checkout = new YooCheckout({
  shopId: process.env.SHOP_ID,
  secretKey: process.env.SHOP_SECRET_KEY,
});

const receiptCreator = (email, type, item) => {
  return {
    send: true,
    customer: {
      email: email,
    },
    settlements: [
      {
        type: "cashless",
        amount: {
          value: item.price.toFixed(2),
          currency: "RUB",
        },
      },
    ],
    type: type,
    items: [
      {
        description: item.name,
        quantity: "1.000",
        amount: {
          value: item.price.toFixed(2),
          currency: "RUB",
        },
        vat_code: 1,
      },
    ],
  };
};

router.post("/createPayment", async (req, res) => {
  try {
    const { userId, courseId, email } = req.body;
    const userRef = db.collection("users").doc(userId);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(400).json({
        status: "failure",
        message: "Для покупки курса необходима авторизация",
      });
    }
    const courseRef = db.collection("courses").doc(courseId);
    const doc = await courseRef.get();
    if (doc.data().price === 0) {
      await userRef.update({
        courses: firebase.firestore.FieldValue.arrayUnion(doc.data().name),
      });
      return res
        .status(201)
        .json({ status: "success", message: "Курс добавлен в ваш аккаунт" });
    }

    const createPayload = {
      amount: {
        value: doc.data().price.toFixed(2),
        currency: "RUB",
      },
      payment_method_data: {
        type: "bank_card",
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.MyCoursesUrl,
      },
      description: doc.data().name,
      receipt: receiptCreator(email, "payment", {
        name: doc.data().name,
        price: doc.data().price,
      }),
    };
    const idempotenceKey = uuid.v4();
    const payment = await checkout.createPayment(createPayload, idempotenceKey);

    const orderRef = db.collection("orders").doc(payment.id);
    await orderRef.set({
      userId,
      idempotenceKey,
      amount: payment.amount.value,
      status: payment.status,
      courseName: payment.description,
    });

    // return res.status(201).redirect(payment.confirmation.confirmation_url);
    return res.status(201).json({ payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.post("/status", async (req, res) => {
  try {
    const dto = req.body;
    const orderRef = db.collection("orders").doc(dto.object.id);

    if (dto.event === "payment.waiting_for_capture") {
      console.log("payment.waiting_for_capture");
      const doc = await orderRef.get();
      const payment = await checkout.capturePayment(
        dto.object.id,
        {
          amount: dto.object.amount,
          // recipient: dto.object.recipient,
        },
        doc.data().idempotenceKey
      );
      return res.status(201).json({ status: "success", payment: payment });
    }

    if (dto.event === "payment.succeeded") {
      console.log("payment.succeeded");
      await orderRef.update({
        status: dto.object.status,
        created_at: dto.object.created_at,
        captured_at: dto.object.captured_at,
      });
      const doc = await orderRef.get();
      const userRef = db.collection("users").doc(doc.data().userId);
      await userRef.update({
        courses: firebase.firestore.FieldValue.arrayUnion(
          doc.data().courseName
        ),
      });

      return res
        .status(201)
        .json({ status: "success", message: "Курс добавлен в ваш аккаунт" });
    }

    return res.status(201).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
