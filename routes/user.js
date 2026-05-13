const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// ✅ Signup
router.route("/signup")
    .get(userController.renderSignup)
    .post(userController.signup);

// ✅ Login
router.route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), userController.Login);

// ✅ Logout
router.get("/logout", userController.Logout);

module.exports = router;