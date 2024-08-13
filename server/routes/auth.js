const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Use async/await
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK,
    },

    async function (accessToken, refrshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage:
          profile.photos && profile.photos[0]
            ? profile.photos[0].value
            : "default-image-url",
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log("user found");
          return done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error, null);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
),
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login-failure",
      successRedirect: "/dashboard",
    })
  );

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error), res.send("Error loggin out");
    } else {
      res.redirect("/");
    }
  });
});

router.get("/login-failure", (req, res) => {
  res.send("something went wrong ...");
});

module.exports = router;
