var mongoose = require("mongoose");

var colabSchema = new mongoose.Schema({
  textData: String,
});

module.exports = mongoose.model("Colab", colabSchema);
