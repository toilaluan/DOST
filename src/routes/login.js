const express = require('express')
const router = express.Router();
const loginController = require('../app/controllers/LoginController')
const authMiddleware = require('../middlewares/auth.middlewares')

router.get('/', authMiddleware.isAuth ,loginController.index)
router.post('/',loginController.checkLogin)
router.get('/logout',loginController.logout)

module.exports = router;