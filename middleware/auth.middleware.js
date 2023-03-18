const { auth } = require("../firebase");

class Middleware {
  async isAdmin(req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No authorization" });
      }

      const decoded = await auth.getAuth().verifyIdToken(token);
      if (decoded.uid !== process.env.ADMIN_UID)
        return res.status(400).json({
          status: "failure",
          message: "Вы не администратор",
        });
      if (decoded) {
        req.user = decoded;
        return next();
      }
      return res.status(401).json({ message: "No authorization" });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "No authorization" });
    }
  }

  async decodeToken(req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const url = req.url.split("/");

      let token = "";
      if (url[1] === "video") {
        // const parsedUrl = url[2].split("="); //["", "course name", "id", "token" ]
        // token = parsedUrl[3];
        return next();
      } else {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ message: "No authorization - a" });
      }

      const decoded = await auth.getAuth().verifyIdToken(token);

      if (decoded) {
        req.user = decoded;
        return next();
      }
      return res.status(401).json({ message: "No authorization - b" });
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .json({ message: "Необходима авторизации, обновите страницу!" });
    }
  }
}

module.exports = new Middleware();
