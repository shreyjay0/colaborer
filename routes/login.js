var express = require("express");
var router = express.Router();
var passport = require("passport");
var loginControl = require("../controllers/loginControl");
router
  .route("/signup")
  .get(function (req, res, next) {
    res.render("auth/signup", { title: "Register" });
  })
  .post(function (req, res, next) {
    loginControl.validate("addColaborer"), loginControl.addColaborer;
  });

router
  .route("/login")
  .get(function (req, res, next) {
    res.render("auth/login", { title: "Login" });
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
    }),
    function (req, res) {
      res.redirect("/");
    }
  );

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/home");
});
module.exports = router;
