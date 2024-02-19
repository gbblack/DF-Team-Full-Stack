const User = require("../../models/User.model.js");
const JWTService = require("../../utils/JWTService/JWTService.js");

const authenticateUser = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(403).send({ message: "No access token provided." });

  const decoded = JWTService.verifyAccessToken(token);

  if (decoded instanceof Error || !decoded.userId)
    return res.status(403).send({ message: "Access token is invalid." });

  const user = await (async () => {
    try {
      return await User.findById(decoded.userId);
    } catch (err) {
      return null;
    }
  })();

  if (!user) return res.status(404).send({ message: "User not found." });

  req.user = user;
  next();
};

module.exports = authenticateUser;
