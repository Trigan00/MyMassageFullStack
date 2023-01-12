const S3 = require("aws-sdk/clients/s3");
const mime = require("mime-types");
const Router = require("express");
const router = new Router();
const { db } = require("../firebase");
const videoMiddleware = require("../middleware/video.middleware");

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

router.get("/:key", videoMiddleware.validateVideo, async (req, res, next) => {
  try {
    const id = req.params.key;
    const category =
      id.substring(id.length - 1) === "1" ? "primevideos" : "videos";

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
module.exports = router;

let request = 0;
router.get("/video/:key", async (req, res, next) => {
  console.log("Handling request", ++request, req.url);
  const params = {
    Key: req.params.key,
    Bucket: "test-backet-ayaz/massage-videos",
  };

  s3.headObject(params, function (err, data) {
    if (err) {
      console.error(err);
      return next();
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
});
