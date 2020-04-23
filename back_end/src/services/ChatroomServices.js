let currUser = [];
const knex = require("knex")(require("../../knexfile.js")["development"]);

module.exports = {
  socket: {
    joinRoom: async function (data, socket, io) {
      // markdown the current online user
      if (currUser[data.username] != undefined) {
        socket.leave(currUser[data.username]["roomID"]);
      }
      currUser[data.username] = {
        username: data.username,
        roomID: data.roomID,
        socketId: socket.id,
      };
      // join the room
      socket.join(currUser[data.username]["roomID"]);

      // get the chat histroy
      let msgRecord = await this.getMsgRecord(data.roomID);
      let boardMsg = "";
      for (let i = 0; i < msgRecord.length; i++) {
        boardMsg += `${msgRecord[i].linetxt}`;
      }
      // emit signal to front-end to get the history
      io.to(currUser[data.username]["socketId"]).emit("getHistory", boardMsg);
    },
    sendMsg: function (data, msg, io) {
      // emit signal to front-end to get the message
      let boardMsg = `${currUser[data.username]["username"]}: ${msg}\n`;
      console.log(boardMsg);
      this.recordMsg(currUser[data.username]["roomID"], boardMsg);
      io.to(currUser[data.username]["roomID"]).emit("receiveMsg", boardMsg);
    },
    disconnect: function (data, socket) {
      delete currUser[data.username];
      console.log(currUser);
      socket.disconnect(true);
    },
    getMsgRecord: async function (roomID) {
      let result = await knex.raw(
        `
          SELECT linetxt, created_at
          FROM chatroom_history
          WHERE roomID = ?
        `,
        [roomID]
      );
      result = result[0];
      return result;
    },
    recordMsg: async function (roomID, msg) {
      await knex.raw(
        `
          INSERT INTO chatroom_history(roomID, linetxt)
          VALUE(?, ?)
        `,
        [roomID, msg]
      );
    },
  },
  getListofRoom: async function (username) {
    let result = await knex.raw(
      `
        SELECT roomID, username_A, username_B, requestID
        FROM chatroom_pair
        WHERE username_A = ?
        OR username_B = ?
      `,
      [username, username]
    );
    result = result[0];
    return result;
  },
  getDateDetail: async function (requestID) {
    let result = await knex("request")
      .select("*")
      .where({ requestID: requestID });
    result = result[0];
    return result;
  },
};
