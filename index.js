const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const primeRouter = require("./routes/prime.routes");
const adminRouter = require("./routes/admin.routes");
const lessonRouter = require("./routes/lesson.routes");
const authMiddleware = require("./middleware/auth.middleware");
// const videoMiddleware = require("./middleware/video.middleware");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(authMiddleware.decodeToken);

app.use("/api/auth", authRouter);
app.use("/api/prime", /*authMiddleware.decodeToken,*/ primeRouter);
app.use("/api/admin", authMiddleware.decodeToken, adminRouter);
app.use("/api/lesson", /*videoMiddleware.validateVideo,*/ lessonRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", async (req, res) => {
  res.status(200).json("Сервер работает");
});

app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
