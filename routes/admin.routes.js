// const { db } = require("../firebase");
const Router = require("express");
const router = new Router();
const EasyYandexS3 = require("easy-yandex-s3").default;
const multer = require("multer");
const upload = multer();

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
  Bucket: "test-backet-ayaz", // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});

router.post("/uploadFile", upload.single("file"), async (req, res) => {
  try {
    const {
      file,
      body: { name },
    } = req;

    const list = await s3.GetList("/massage-videos/");

    for (const el of list.Contents) {
      if (el.Key === `massage-videos/${name}`) {
        return res
          .status(400)
          .json({ status: "failure", message: "Такой файл уже существует." });
      }
    }

    const upload = await s3.Upload(
      {
        buffer: file.buffer,
        name: name,
      },
      "/massage-videos/"
    );
    if (upload) {
      return res
        .status(201)
        .json({ status: "success", message: "file added.", info: upload });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
router.put("/deleteFile", async (req, res) => {
  try {
    const { fileName } = req.body;
    let remove = await s3.Remove(fileName);
    if (remove) {
      return res
        .status(204)
        .json({ status: "success", message: "file deleted." });
    }
    return res.status(409).json({
      status: "failure",
      message: "Video was not deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
