const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Route = require("../routes/auth.routes");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const app = express();


const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    }
  )
);
app.use("/api/auth", Route);

module.exports = app;
