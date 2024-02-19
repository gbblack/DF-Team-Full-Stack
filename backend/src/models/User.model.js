const mongoose = require("mongoose");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}.local` });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["GRADUATE", "INDUSTRY_PARTNER"],
    required: true,
  },
});

const authDB = mongoose.connection.useDb(process.env.AUTH_DB);

const User = authDB.model("User", userSchema);

module.exports = User;
