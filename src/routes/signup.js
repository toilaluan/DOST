const express = require("express");
const router = express.Router();
const signupController = require("../app/controllers/SignupController");

router.post("/store", signupController.store);
router.use("/", signupController.index);

module.exports = router;
