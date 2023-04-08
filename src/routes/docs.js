const express = require('express')
const router = express.Router();
const docController = require('../app/controllers/DocController')
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});
router.get('/upload', docController.upload)
router.post('/store', upload.single('file'), docController.store);
router.get('/:slug', docController.show)    

module.exports = router