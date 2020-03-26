const { standardServiceResponse } = require("../utils/ResponseHandler");
const chatroomServices = require("../services/ChatroomServices.js");

module.exports = {
  socket: function(socket, io) {
    console.log("Connect Socket!");
    socket.on("joinRoom", (user, roomID) => {
      console.log("Handling joinRoom signal!");
      let data = {
        username: user.name,
        roomID: roomID
      };
      chatroomServices.socket.joinRoom(data, socket, io);
    });
    socket.on("sendMsg", (user, msg) => {
      console.log("Handling sendMsg signal!");
      let data = {
        username: user.name
      };
      chatroomServices.socket.sendMsg(data, msg, io);
    });

    socket.on("leavePage", user => {
      console.log("Handling disconnect signal!");
      let data = {
        username: user.name
      };
      chatroomServices.socket.disconnect(data, socket);
    });
  },
  getListofRoom: function(req, res, next) {
    try {
      console.log("ChatroomController.getListofRoom started!");
      let username = req.params.username;
      return standardServiceResponse(
        res,
        next,
        chatroomServices.getListofRoom(username)
      );
    } catch (err) {
      console.log(
        "Error: ChatroomController.getListofRoom: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  }
};
