//imports
var createError = require("http-errors");
var express = require("express");
var loginRouter = require("./routes/login");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
var validateEntries = require("express-validator");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var colabRouter = require("./routes/colab");
var passport = require("./config/passport");
var config = require("./config/config");
mongoose.connect(config.dbConnstring);
global.Colaborer = require("./models/Colaborer");
global.Colab = require("./models/Colab");
app.use("/", taskRoute);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(validateEntries());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secrets",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
//use router
app.use("/", indexRouter);
app.use("/", loginRouter);
app.use("/", usersRouter);
app.use("/", colabRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
