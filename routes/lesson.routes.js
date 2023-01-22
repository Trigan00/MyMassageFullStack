const S3 = require("aws-sdk/clients/s3");
const mime = require("mime-types");
const Router = require("express");
const router = new Router();
const { db } = require("../firebase");
// const authMiddleware = require("../middleware/auth.middleware");
// const videoMiddleware = require("../middleware/video.middleware");

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

router.get(
  "/my_courses",
  /* authMiddleware.decodeToken, */ async (req, res) => {
    try {
      const { user } = req;
      const userRef = db.collection("users").doc(user.uid);
      const doc = await userRef.get();

      return res
        .status(200)
        .json({ status: "success", courses: doc.data().courses });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failure",
        message: "Something went wrong, try again",
      });
    }
  }
);
router.get("/lesson/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const id = key.split("-")[0];
    const category = key.split("-")[1];

    // const category =
    //   id.substring(id.length - 1) === "1" ? "primevideos" : "videos";

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
router.get(
  "/video/:key",
  /* authMiddleware.decodeToken, */
  async (req, res, next) => {
    console.log("Handling request", ++request, req.url.split("token:")[0]);
    const key = req.params.key;
    const params = {
      Key: key.split("token:")[0],
      Bucket: `${process.env.BUCKET}/massage-videos`,
    };

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
  }
);

module.exports = router;
