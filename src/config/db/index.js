const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/doc_stock');
        console.log('Connect to DB successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };