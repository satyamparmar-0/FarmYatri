const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const User = require("../../models/userModel");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  // const token = req.headers("Authorization");
  if (!token) {
    logger.info("---***authenticateUser No token, authorization denied***---");
    return res.status(401).json({status:false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      logger.info("---***authenticateUser User not found");
      return res.status(404).json({status:false, message: "User not found" });
    }
    next();
  } catch (err) {
    logger.error("Authentication error", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = {
  authenticateUser,
};
