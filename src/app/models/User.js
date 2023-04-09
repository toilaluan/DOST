const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password : String,
    id_docs: Array,
});

module.exports = mongoose.model('User', User);