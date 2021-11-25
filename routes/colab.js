var express = require("express");
var router = express.Router();

router.get("/addColab", function (req, res) {
  var colabAdd = new Colab();
  colabAdd.save(function (err, cval) {
    if (err) {
      console.log(err);
      res.render("Something went wrong");
    } else {
      res.redirect("/colab/" + cval.id);
    }
  });
});

router.get("/colab/:id", function (req, res) {
  if (req.params.id) {
    Colab.findOne({ id: req.params.id }, function (err, cval) {
      if (err) {
        console.log(err);
        res.render("Something went wrong");
      }
      if (cval) {
        res.render("colab", { cval: cval, colabId: cval.id });
      } else {
        res.render("Something went wrong");
      }
    });
  } else {
    res.render("Something went wrong");
  }
});

module.exports = router;
