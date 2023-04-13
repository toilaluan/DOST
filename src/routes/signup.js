const express = require("express");
const router = express.Router();
const signupController = require("../app/controllers/SignupController");
const authMiddleware = require('../middlewares/auth.middlewares')

router.post("/store", signupController.store);
router.use("/", authMiddleware.isAuth,signupController.index);

module.exports = router;
