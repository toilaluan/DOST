const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  id_docs: { type: Array },
  id_docs_bought: { type: Array },
});

module.exports = mongoose.model("User", User);
