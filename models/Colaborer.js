var crypto = require("crypto");
var mongoose = require("mongoose");

//model structure
var colaborerSchema = new mongoose.Schema({
  uname: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  salt: String,
  hash: String,
});

colaborerSchema.methods.setPassword = function (pass) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(pass, this.salt, 1000, 64, "sha1")
    .toString("hex");
};

colaborerSchema.methods.validPassword = function (pass) {
  var hash = crypto
    .pbkdf2Sync(pass, this.salt, 1000, 64, "sha1")
    .toString("hex");
  return this.hash === hash;
};

//export model
module.exports = mongoose.model("User", colaborerSchema);
