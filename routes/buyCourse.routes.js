const firebase = require("firebase-admin");
const { db } = require("../firebase");
const Router = require("express");
const router = new Router();
router.post("/course", async (req, res) => {
  try {
    const { id, courseName } = req.body;
    console.log(id);
    const userRef = db.collection("users").doc(id);
    await userRef.update({
      courses: firebase.firestore.FieldValue.arrayUnion(courseName),
    });

    return res
      .status(201)
      .json({ status: "success", message: "course added." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
