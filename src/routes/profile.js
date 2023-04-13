const express = require('express')
const router = express.Router();
const profileController = require('../app/controllers/ProfileController')
const authMiddleware = require('../middlewares/auth.middlewares')

router.use('/' ,authMiddleware.loggedin, profileController.index)

module.exports = router;