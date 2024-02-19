const mongoose = require("mongoose");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}.local` });

const vacancySchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

const dataDB = mongoose.connection.useDb(process.env.DATA_DB);

const Vacancy = dataDB.model("Vacancy", vacancySchema);

module.exports = Vacancy;
