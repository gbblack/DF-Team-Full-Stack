const mongoose = require("mongoose");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}.local` });

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telepone: String,
  position: String,
  location: String,
});

const IndustryPartnerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  keyContacts: {
    type: [ContactSchema],
    default: [],
  },
  officeLocations: {
    type: [String],
    default: [],
  },
  logo: {
    type: String,
    default: "images/ip-profiles/__default.jpg",
  },
});

const dataDB = mongoose.connection.useDb(process.env.DATA_DB);

const IndustryPartner = dataDB.model("IndustryPartner", IndustryPartnerSchema);

module.exports = IndustryPartner;
