const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/doc_stock", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connect to DB successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
