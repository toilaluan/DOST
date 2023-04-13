const { Int32 } = require("mongodb");
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
  price: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model("Doc", Doc);
