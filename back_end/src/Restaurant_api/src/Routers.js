const express = require('express');
const controllers = require('./Controllers.js');
const router = express.Router();

router.get("/test",controllers.testController);
router.get("/details", controllers.queryData);
router.get("/feedback");

module.exports = router;