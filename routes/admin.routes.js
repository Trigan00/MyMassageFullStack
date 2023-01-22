const Router = require("express");
const router = new Router();
const EasyYandexS3 = require("easy-yandex-s3").default;
const { db } = require("../firebase");
const crypto = require("crypto");
const multer = require("multer");
const upload = multer();

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
  Bucket: process.env.BUCKET, // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});

router.post("/newCourse", async (req, res) => {
  try {
    const { name } = req.body;

    const id = crypto.createHash("md5").update(name).digest("hex");
    const docRef = db.collection("courses").doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      return res.status(400).json({
        status: "failure",
        message: "Курс с таким названием уже существует",
      });
    }

    await docRef.set({
      name: name,
    });

    return res.status(201).json({ status: "success", message: "Курс создан." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
router.post("/uploadFile", upload.single("file"), async (req, res) => {
  try {
    const {
      file,
      body: { name, inputName, collectionName },
    } = req;

    const list = await s3.GetList("/massage-videos/");
    let id = crypto.createHash("md5").update(name).digest("hex");
    id += collectionName === "primevideos" ? "1" : "0";
    console.log(id);
    for (const el of list.Contents) {
      if (el.Key === `massage-videos/${id}`) {
        return res
          .status(400)
          .json({ status: "failure", message: "Такой файл уже существует." });
      }
    }

    const upload = await s3.Upload(
      {
        buffer: file.buffer,
        name: id,
      },
      "/massage-videos/"
    );
    if (!upload) {
      res.status(500).json({
        status: "failure",
        message: "Файл не загружен в базу данных, попробуйте снова",
      });
    }
    const docRef = db.collection(collectionName).doc(id);

    await docRef.set({
      name: inputName,
      fileName: name,
      // url: upload.Location,
    });
    return res
      .status(201)
      .json({ status: "success", message: "Файл добавлен." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
router.post("/deleteFile", async (req, res) => {
  try {
    const { id, category } = req.body;
    let remove = await s3.Remove(`massage-videos/${id}`);
    if (!remove) {
      return res.status(409).json({
        status: "failure",
        message: "Файл не удален из базы данных, попробуйте снова",
      });
    }
    await db.collection(category).doc(id).delete();
    return res.json({ status: "success", message: "Файл удален." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
