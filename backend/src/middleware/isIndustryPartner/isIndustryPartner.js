const IndustryPartner = require("../../models/IndustryPartner.model.js");

const isIndustryPartner = async (req, res, next) => {
  const { user } = req;

  console.log(user)

  if (!user) return res.status(500).send({ message: "No user attached." });

  if (user.role !== "INDUSTRY_PARTNER")
    return res
      .status(403)
      .send({ message: "User is missing a required role." });

      console.log(user.id)

  const industryPartner = await IndustryPartner.findOne({ userId: user.id });

  console.log({industryPartner})

  if (!industryPartner)
    return res.status(404).send({ message: "IndustryPartner not found." });

  req.industryPartner = industryPartner;
  next();
};

module.exports = isIndustryPartner;
