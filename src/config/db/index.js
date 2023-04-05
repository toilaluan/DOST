const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/doc_stock', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to DB successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };