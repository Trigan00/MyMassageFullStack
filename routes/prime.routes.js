const { db } = require("../firebase");
const Router = require("express");
const router = new Router();
router.post("/getPrime", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const cityRef = db.collection("users").doc(id);
    await cityRef.update({ prime: true });

    return res.status(201).json({ status: "success", message: "prime added." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong, try again",
    });
  }
});
module.exports = router;
