const express = require("express");
const router = express.Router();
const requestController = require("../controllers/RequestController.js");

router.get("/getLocationList", requestController.queryLocationList);
router.get("/getRequest", requestController.queryRequest);
router.get("/getInvitation", requestController.queryInvitation);
router.post("/insertRequestInfo", requestController.queryInsertRequestInfo);

router.get("/requestlist", requestController.getListOfRequest);
router.post("/sendInvitation", requestController.insertInvitation);

// my request
router.get("/getRequest/:username", requestController.getMyRequest);
router.get("/getInvitation/:requestID", requestController.getInvitation);
router.post("/acceptInvitation", requestController.acceptInvitation);
module.exports = router;
