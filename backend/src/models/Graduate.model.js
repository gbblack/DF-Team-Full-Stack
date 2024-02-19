const mongoose = require("mongoose");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}.local` });

const graduateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  discipline: {
    type: String,
    enum: ["Software Engineering", "Data Science", "Cloud Engineering"],
    required: true,
  },
  tagline: {
    type: String,
    required: false,
  },
  imagePath: {
    type: String,
    required: false,
  },
});

const dataDB = mongoose.connection.useDb(process.env.DATA_DB);

const Graduate = dataDB.model("Graduate", graduateSchema);

module.exports = Graduate;
