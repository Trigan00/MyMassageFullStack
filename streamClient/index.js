const S3 = require("aws-sdk/clients/s3");
const { S3ReadStream } = require("s3-readstream");

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

function createAWSStream(bucketParams) {
  return new Promise((resolve, reject) => {
    try {
      s3.headObject(bucketParams, (error, data) => {
        if (error) {
          throw error;
        }

        const options = {
          parameters: bucketParams,
          s3,
          maxLength: data.ContentLength,
          byteRange: 1024 * 1024 * 5,
        };

        const stream = new S3ReadStream(options);
        stream.moveCursorForward(1024 * 1024);
        stream.moveCursorBack(1024 * 1024);

        resolve(stream);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { createAWSStream };
