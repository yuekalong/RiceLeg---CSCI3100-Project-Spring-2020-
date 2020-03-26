const express = require("express");
const router = express.Router();
const testController = require("../controllers/TestController.js");

router.get("/router", testController.showHelloWorldControl);
router.get("/knexTest", testController.querySomeData);
router.post("/insert", testController.queryInsertData);

module.exports = router;
