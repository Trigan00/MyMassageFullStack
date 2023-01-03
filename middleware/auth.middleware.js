const { auth } = require("../firebase");

class Middleware {
  async decodeToken(req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No authorization" });
      }

      // auth
      //   .getAuth()
      //   .verifyIdToken(token)
      //   .then((decodedToken) => {
      //     console.log("-----------------------Token------------------------");
      //     console.log(decodedToken);
      //     req.user = decodedToken;
      //     return next();
      //     // ...
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     return res.json({ message: "Un authorize", info: error });
      //   });

      const decoded = await auth.getAuth().verifyIdToken(token);
      // console.log("-----------------------Token------------------------");
      // console.log(decoded);
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
}

module.exports = new Middleware();
