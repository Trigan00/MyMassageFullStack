const EasyYandexS3 = require("easy-yandex-s3").default;

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
  Bucket: process.env.BUCKET,
  debug: true,
  // httpOptions: {
  //   timeout: 900000, // 15 minutes
  // },
});

const picturesS3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
  Bucket: process.env.PICTURES_BUCKET,
  debug: true,
});

module.exports = { s3, picturesS3 };
