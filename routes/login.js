var express = require('express');
var router = express.Router();
var passport = require("passport")

router.get("/signup", function(req,res,next) {
    res.render('signup', { title: 'Register a new account'});
  })
  .post(function(req, res, next) {
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('uname', 'Fill in your username').notEmpty();
    req.checkBody('pass', 'Fill in Password').notEmpty();
    req.checkBody('pass', 'Passwords must be same').equals(req.body.confirmPass).notEmpty();

    var err = req.validationErrors();
    if (err) {
      res.render('signup', {
        uname: req.body.uname,
        email: req.body.email,
        err: err
      });
    } else {
      var colaborerr = new User();
      colaborerr.email = req.body.email;
      colaborerr.uname = req.body.uname;
      colaborerr.setPassword(req.body.password);
      colaborerr.save(function (err) {
        if (err) {
          res.render('signup', {err: err});
        } else {
          res.redirect('/login');
        }
      })
    }

} )

module.exports = router;
