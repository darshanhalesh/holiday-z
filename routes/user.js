const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { rendersignup, signup, renderlogin, logout, logIn } = require("../controller/user.js");


router.route("/signup")
.get(rendersignup)
.post( wrapAsync(signup));

router.route("/login")
.get(renderlogin)
.post(saveRedirectUrl,
  passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
  }),logIn
 )

router.get("/logout",logout)
module.exports = router;
