const express = require("express");

const Graduate = require("../../models/Graduate.model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const graduates = await Graduate.find({});

    const grads = graduates.map(grad => {
      grad.imagePath = `${process.env.ORIGIN}` + grad.imagePath;
      return grad;
    });

    return res.send({
      message: "Graduates located successfully.",
      payload: grads,
    });
  } catch (err) {
    return res.status(500).send({ message: "Query failed." });
  }
});

module.exports = router;
