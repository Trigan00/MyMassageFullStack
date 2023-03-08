const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const buyCourse = require("./routes/buyCourse.routes");
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

app.use("/api/auth", authRouter);
app.use("/api/buy", authMiddleware.decodeToken, buyCourse);
app.use("/api/admin", authMiddleware.isAdmin, adminRouter);
app.use("/api/courses", authMiddleware.decodeToken, lessonRouter);

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
