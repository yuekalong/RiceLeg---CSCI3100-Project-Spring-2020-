const express = require("express");
const router = express.Router();
const sendSignUpController = require("../controllers/SignUpController.js");

router.post("/insertRequestInfo", sendSignUpController.queryInsertUserInfo);

module.exports = router;
