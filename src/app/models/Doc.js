const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doc = new Schema({
    title: String,
    summary: String,
    tags: String,
    link: String
});

module.exports = mongoose.model('Doc', Doc);