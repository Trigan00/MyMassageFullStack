const { auth, db } = require("../firebase");

class Middleware {
  async validateVideo(req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const key = req.url.split("/");
      const id = key[1];

      if (id.substring(id.length - 1) === "1") {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No authorization" });
        }

        const decoded = await auth.getAuth().verifyIdToken(token);
        console.log(decoded);
        if (!decoded)
          return res.status(401).json({ message: "No authorization" });
        const userRef = db.collection("users").doc(decoded.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
          return res.status(400).json({ message: "No such document!" });
        }
        console.log("Document data:", doc.data());
        if (doc.data().prime === true) {
          return next();
        }
        return res.status(401).json({ message: "Нет доступа" });
      }

      return next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "failure",
        message: "Something went wrong, try again",
      });
    }
  }
}

module.exports = new Middleware();
