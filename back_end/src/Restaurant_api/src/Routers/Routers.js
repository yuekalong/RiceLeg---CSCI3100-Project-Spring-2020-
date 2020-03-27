const express = require('express');
const controllers = require("../Controllers/Controllers.js");
const bodyparser = require('body-parser');
const router = express.Router();

router.get("/test",controllers.testController);
router.get("/query", controllers.queryData);
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));
router.post("/update",controllers.updateFeedback);
router.get("/feedbacks",);

module.exports = router;