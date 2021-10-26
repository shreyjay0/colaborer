var express = require("express");
var router = express.Router();
var passport = require("passport");

router
  .route("/signup")
  .get(function (req, res, next) {
    res.render("auth/signup", { title: "Register" });
  })
  .post(function (req, res, next) {
    req.checkBody("uname", "Please fill your username").notEmpty();
    req.checkBody("email", "Email is invalid").isEmail();
    req.checkBody("name", "Please fill your name").notEmpty();
    req.checkBody("pass", "Please fill in password").notEmpty();
    req
      .checkBody("cpass", "Passwords must be same")
      .equals(req.body.cpass)
      .notEmpty();

    var err = req.validateEntries();
    if (err) {
      res.render("signup", {
        uname: req.body.uname,
        email: req.body.email,
        err: err,
      });
    } else {
      var colaborer = new Colaborer();
      colaborer.uname = req.body.uname;
      colaborer.name = req.body.name;
      colaborer.email = req.body.email;
      colaborer.setPassword(req.body.pass);
      colaborer.save(function (err) {
        if (err) {
          res.render("auth/signup", { err: err });
        } else {
          res.redirect("/login");
        }
      });
    }
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
