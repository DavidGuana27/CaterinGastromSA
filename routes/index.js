var express = require("express");
var router = express.Router();

/* GET home page (index.ejs). */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET section (section_uno.ejs). */
router.get("/welcome", function (req, res, next) {
  res.render("welcome", { title: "welcome" });
});



module.exports = router;
