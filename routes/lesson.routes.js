const S3 = require("aws-sdk/clients/s3");
const mime = require("mime-types");
const crypto = require("crypto");
const Router = require("express");
const multer = require("multer");
const upload = multer();
const router = new Router();
const { db } = require("../firebase");
const { picturesS3 } = require("../s3Init");
const url = require("url");
// const { S3ReadStream } = require("s3-readstream");
// const { createAWSStream } = require("../streamClient");

var s3 = new S3({
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
  endpoint: "https://storage.yandexcloud.net",
  s3ForcePathStyle: true,
  region: "us-east-1",
  apiVersion: "latest",
});

router.get("/my_courses", async (req, res) => {
  try {
    const { user } = req;
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();

    const courses = [];
    for (const name of doc.data().courses) {
      const id = crypto.createHash("md5").update(name).digest("hex");
      const doc = await db.collection("courses").doc(id).get();
      if (doc.exists) courses.push(name);
    }

    return res.status(200).json({ status: "success", courses: courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
router.get("/lesson/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const id = key.split("-")[0];
    const category = key.split("-")[1];

    const userRef = db.collection("users").doc(req.user.uid);
    const user = await userRef.get();
    const userCourses = user.data().courses;
    if (!userCourses.includes(category)) {
      return res.status(400).json({
        status: "failure",
        message: "Нет доступа",
      });
    }

    const videoRef = db.collection(category).doc(id);

    const doc = await videoRef.get();
    if (!doc.exists) {
      return res.status(400).json({ message: "No such document!" });
    }

    return res.status(200).json({ status: "success", data: doc.data() });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

let request = 0;
router.get("/video/:key", async (req, res, next) => {
  const key = req.params.key.split("="); //["", "course name", "id", "token" ]

  console.log("Handling request", ++request, key[2]);
  const params = {
    Key: key[2],
    Bucket: `${process.env.BUCKET}/${key[1]}`,
  };
  // const stream = await createAWSStream(params);
  // stream.pipe(res);

  try {
    s3.headObject(params, function (err, data) {
      if (err) {
        console.error(err);
        return;
      }
      if (req.headers.range) {
        const range = req.headers.range;
        const bytes = range.replace(/bytes=/, "").split("-");
        const start = parseInt(bytes[0], 10);
        const total = data.ContentLength;
        const end = bytes[1] ? parseInt(bytes[1], 10) : total - 1;
        const chunkSize = end - start + 1;
        res.set("Content-Range", "bytes " + start + "-" + end + "/" + total);
        res.set("Accept-Ranges", "bytes");
        res.set("Content-Length", chunkSize.toString());
        params["Range"] = range;
        console.log(
          "video buffering - range, total, start, end ,params",
          range,
          total,
          start,
          end,
          params
        );
      } else {
        res.set("Content-Length", data.ContentLength.toString());
        console.log("video buffering - ,params", params);
      }
      res.status(206);
      res.set("Content-Type", mime.lookup(params.Key));
      // res.set("Last-Modified", data.LastModified.toString());
      res.set("ETag", data.ETag);
      const stream = s3.getObject(params).createReadStream();
      stream.on("error", function error(err) {
        return next(err);
      });
      stream.on("end", () => {
        console.log("Served by Amazon S3: " + params.Key);
      });
      stream.pipe(res);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/feedback", upload.single("file"), async (req, res) => {
  try {
    const {
      file,
      body: { message, videoName, courseName, userID, email, username },
    } = req;
    const Ref = db.collection("feedback").doc(courseName);
    if (file) {
      const upload = await picturesS3.Upload(
        {
          buffer: file.buffer,
          name: userID,
        },
        "/Users Images/"
      );

      if (!upload) {
        res.status(500).json({
          status: "failure",
          message: "Файл не загружен в базу данных, попробуйте снова",
        });
      }

      await Ref.set(
        {
          [videoName]: {
            [userID]: {
              email,
              username,
              message,
              imageURL: upload.Location,
            },
          },
        },
        { merge: true }
      );
    }

    await Ref.set(
      {
        [videoName]: {
          [userID]: {
            email,
            username,
            message,
          },
        },
      },
      { merge: true }
    );
    return res
      .status(201)
      .json({ status: "success", message: "Отзыв добавлен." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

router.get("/feedback", async (req, res) => {
  try {
    const url_parts = url.parse(req.url, true);
    const { courseName, videoName } = url_parts.query;
    const user_id = req.user.uid;

    const videoRef = db.collection("feedback").doc(courseName);

    const doc = await videoRef.get();
    if (!doc.exists) {
      return res.status(200).json({ message: "No such document!" });
    }

    return res
      .status(200)
      .json({ status: "success", data: doc.data()?.[videoName]?.[user_id] });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});

module.exports = router;
