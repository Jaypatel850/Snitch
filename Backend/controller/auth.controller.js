const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Register = require("../Model/auth.model");
const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;
    const existingUser = await Register.findOne({ $or: [{ email }, { contact }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Register({
      name,
      email,
        password: hashedPassword,
        contact,
        role
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Use in production
        maxAge: 3600000 // 1 hour in milliseconds
    });
    res.status(201).json({ message: "User registered successfully" });
  }catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const googleCallback = (req, res) => {
  console.log("Google OAuth callback hit");
  console.log("User profile:", req.user);
  res.redirect("http://localhost:5173/");
}
module.exports = { registerUser, loginUser ,googleCallback};