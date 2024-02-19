const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWTService = require("../../utils/JWTService/JWTService");

const validateSignup = require("../../middleware/validateSignup.js");
const validateLogin = require("../../middleware/validateLogin.js");

const User = require("../../models/User.model.js");
const IndustryPartner = require("../../models/IndustryPartner.model.js");

const router = express.Router();

router.post("/signup", validateSignup, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({ message: "User details invalid." });

  const { email, password, companyName } = req.body;

  const exists = await User.findOne({ email });

  if (exists) return res.status(400).send({ message: "User already exists." });

  const user = new User({
    email,
    password: bcrypt.hashSync(password, 8),
    role: "INDUSTRY_PARTNER",
  });

  const partner = new IndustryPartner({ userId: user.id, companyName });

  try {
    await mongoose.connection.transaction(async () => {
      await user.save();
      await partner.save();

      return res.status(201).send({ message: "User created successfully." });
    });
  } catch {
    return res.status(500).send({ message: "User could not be created." });
  }
});


router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({ message: "Login details are invalid." });

    // const { email, password } = req.body;
    const { email, password } = req.body;

  const exists = await User.findOne({ email });

  if (!exists) return res.status(400).send({ message: "User does not exist" });

  const invalidPassword = bcrypt.compareSync(password, exists.password);

  if (!invalidPassword) {
    return res.status(400).send({
      accessToken: null,
      message: "Invalid password"
    });
  }

  const { JWT_SECRET } = process.env;

  // const token = jwt.sign({ id: exists._id }, JWT_SECRET, { expiresIn: 86400 });
  const token = JWTService.generateAccessToken(exists._id);

  return res.status(200).send({
    message: "Login successful",
    payload: { role: exists.role, accessToken: token }
  });

});

module.exports = router;
