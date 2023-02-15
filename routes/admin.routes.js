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
  Bucket: process.env.BUCKET,
  debug: true,
});

const picturesS3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
  Bucket: process.env.PICTURES_BUCKET,
  debug: true,
});

router.post("/newCourse", upload.single("file"), async (req, res) => {
  try {
    // const { name, price, shortDescription, fullDescription } = req.body;
    const {
      file,
      body: { name, price, shortDescription, fullDescription },
    } = req;

    const id = crypto.createHash("md5").update(name).digest("hex");
    const docRef = db.collection("courses").doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      return res.status(400).json({
        status: "failure",
        message: "Курс с таким названием уже существует",
      });
    }

    const upload = await picturesS3.Upload(
      {
        buffer: file.buffer,
        name: name,
      },
      "/Courses Images/"
    );

    if (!upload) {
      res.status(500).json({
        status: "failure",
        message: "Файл не загружен в базу данных, попробуйте снова",
      });
    }

    await docRef.set({
      name,
      price: +price,
      shortDescription,
      fullDescription,
      pictureUrl: upload.Location,
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
router.delete("/deleteCourse/", async (req, res) => {
  try {
    const name = req.query.key;
    const courseRef = db.collection(name);
    const snapshot = await courseRef.get();

    snapshot.forEach(async ({ id }) => {
      const remove = await s3.Remove(name + "/" + id);
      if (!remove) {
        return res.status(500).json({
          status: "failure",
          message: "Файл не удален из базы данных, попробуйте снова",
        });
      }
    });

    const PictireRemove = await picturesS3.Remove("Courses Images/" + name);
    if (!PictireRemove) {
      return res.status(500).json({
        status: "failure",
        message: "Картинка курса не удалена из базы данных, попробуйте снова",
      });
    }

    snapshot.forEach(async ({ id }) => {
      await courseRef.doc(id).delete();
    });

    const courseId = crypto.createHash("md5").update(name).digest("hex");
    await db.collection("courses").doc(courseId).delete();

    return res
      .status(201)
      .json({ status: "success", message: "Курс удален. Обновите страницу" });
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
      body: { name, inputName, collectionName, description },
    } = req;
    let id = crypto.createHash("md5").update(name).digest("hex");

    const list = await s3.GetList(collectionName);
    console.log("upload file id: " + id);
    for (const el of list.Contents) {
      if (el.Key === `${collectionName}/${id}`) {
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
      collectionName
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
      description: description,
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
    let remove = await s3.Remove(`${category}/${id}`);
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

router.put("/changeVideoDescription", async (req, res) => {
  try {
    const { id, courseName, name, description } = req.body;
    const videoRef = db.collection(courseName).doc(id);
    await videoRef.update({ description, name });
    return res.json({ status: "success", message: "Описание изменено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.put("/changeDescription", async (req, res) => {
  try {
    const { type, description, id } = req.body;
    const courseRef = db.collection("courses").doc(id);
    await courseRef.update({ [type]: description });
    return res.json({ status: "success", message: "Описание изменено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
router.put("/changeCourseImage", upload.single("file"), async (req, res) => {
  try {
    const {
      file,
      body: { courseId, courseName },
    } = req;

    const PictireRemove = await picturesS3.Remove(
      "Courses Images/" + courseName
    );
    if (!PictireRemove) {
      return res.status(500).json({
        status: "failure",
        message:
          "Предыдущая картинка курса не удалена из базы данных, попробуйте снова",
      });
    }

    const upload = await picturesS3.Upload(
      {
        buffer: file.buffer,
        name: courseName,
      },
      "/Courses Images/"
    );

    if (!upload) {
      res.status(500).json({
        status: "failure",
        message: "Файл не загружен в базу данных, попробуйте снова",
      });
    }

    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({ pictureUrl: upload.Location });
    return res.json({ status: "success", message: "Изображение изменено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.put("/changeCoursePrice", async (req, res) => {
  try {
    const { price, courseId } = req.body;
    const courseRef = db.collection("courses").doc(courseId);
    await courseRef.update({ price: price });
    return res.json({ status: "success", message: "Цена изменена" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
