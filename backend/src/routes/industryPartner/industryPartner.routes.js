const express = require("express");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const isUser = require("../../middleware/isUser/isUser.js");
const isIndustryPartner = require("../../middleware/isIndustryPartner/isIndustryPartner.js");

const validateVacancy = require("../../middleware/validateVacancy.js");

const Vacancy = require("../../models/Vacancy.model.js");

const router = express.Router();

router.get("/", [ isUser, isIndustryPartner], async (req, res) => {
  try {   

    const { industryPartner } = req;

    industryPartner.logo = `${process.env.ORIGIN}` + industryPartner.logo;

    const vacancies = await Vacancy.find({ partnerId: industryPartner.id });

    const joined = {
      ...industryPartner.toJSON(),
      vacancies,
    };

    return res.send({
      message: "Industry Partner located successfully.",
      payload: joined,
    });
  } catch (err) {
    return res.status(500).send({ message: "Query failed." });
  }
});

router.post("/vacancies", [ isUser, isIndustryPartner, validateVacancy], async (req, res) => {

  const errors = validationResult(req);

  const { industryPartner } = req;  

  if (!errors.isEmpty())
    return res.status(400).send({ message: "Vacancy details invalid." });

  const { position, location, startDate } = req.body;

  const vacancy = new Vacancy({
    partnerId: industryPartner.id,
    position,
    location,
    startDate,
  });

  try {
    await mongoose.connection.transaction(async () => {
      await vacancy.save();

      return res.status(201).send({ message: "Vacancy created successfully." });
    });
  } catch {
    return res.status(500).send({ message: "Vacancy could not be created." });
  }
});

module.exports = router;
