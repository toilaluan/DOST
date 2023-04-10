const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Doc = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: String,
  tags: String,
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Doc", Doc);
