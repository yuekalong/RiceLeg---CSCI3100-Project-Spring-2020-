const express = require("express");
const router = express.Router();
const sendRequestController = require("../controllers/SendRequestController.js");

router.get("/getLocationList", sendRequestController.queryLocationList);
router.get("/getRequest", sendRequestController.queryRequest);
router.get("/getInvitation", sendRequestController.queryInvitation);
router.post("/insertRequestInfo", sendRequestController.queryInsertRequestInfo);

module.exports = router;
