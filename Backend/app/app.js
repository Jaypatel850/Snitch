const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Route = require("../routes/auth.routes");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const app = express();
app.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    }
  )
);
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());

app.use("/api/auth", Route);

module.exports = app;
