const express = require('express')
const router = express.Router();
const signupController = require('../app/controllers/SignupController')


router.use('/', signupController.index)

module.exports = router;