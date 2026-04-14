const passport = require("passport");
const { registerUser, loginUser ,googleCallback} = require("../controller/auth.controller");
const middleware = require("../middleware/auth.middleware");
const {
  validateRegister,
  handleValidationErrors,
} = require("../middleware/register.validator");
const express = require("express");
const router = express.Router();
router.post(
  "/register",
  validateRegister, // Step 1: Check the req.body against your Mongoose rules
  handleValidationErrors, // Step 2: If rules fail, stop and send 400 Bad Request
  registerUser // Step 3: If data is perfect, run your controller to save the user
);
router.post("/login", loginUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }
  )
),
  (module.exports = router);
