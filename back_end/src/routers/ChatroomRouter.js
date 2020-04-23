const express = require("express");
const router = express.Router();
const chatroomController = require("../controllers/ChatroomController.js");

module.exports = function (io) {
  io.on("connection", (socket) => {
    chatroomController.socket(socket, io);
  });

  router.get("/getListofRoom/:username", chatroomController.getListofRoom);
  router.get("/getDateDetail/:requestID", chatroomController.getDateDetail);
  return router;
};
