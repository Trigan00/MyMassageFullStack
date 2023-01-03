const { db } = require("../firebase");
const Router = require("express");
const router = new Router();
router.post("/addUser", async (req, res) => {
  try {
    const { id, email } = req.body;

    const docRef = db.collection("users").doc(id);

    await docRef.set({
      email,
      prime: false,
      role: "user",
    });

    return res.status(201).json({ status: "success", message: "user added." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
