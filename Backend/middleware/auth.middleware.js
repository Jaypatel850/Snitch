const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const JwtSecret = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = authMiddleware;

