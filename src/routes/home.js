const express = require("express");
const router = express.Router();
const homeController = require("../app/controllers/HomeController");

router.get("/", homeController.index);
router.get('/tag_choose/:tag',homeController.tag_choose)



module.exports = router;
