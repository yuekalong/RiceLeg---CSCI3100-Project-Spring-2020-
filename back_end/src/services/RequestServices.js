/*
 * COMPONENT NAME: SEND_REQUEST_SERVICE
 * PROGRAMMER: LAM HIU LUI, YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: BACKEND SERVICE FOR DOING THE SERVICE EXACTLY IN HERE.
 */

const knex = require("knex")(require("../../knexfile.js")["development"]);
const moment = require("moment-timezone");

module.exports = {
  queryLocationList: async function () {
    let result = await knex.raw(`
        SELECT restaurantName FROM restaurant_details
    `);
    console.log(result[0]);
    result[0] = JSON.stringify(result[0]);
    return result[0];
  },
  queryRequest: async function (user) {
    let result = await knex.raw(`
        SELECT requestId,requestName,location,date,startingTime,endingTime FROM request
    `);
    console.log(result[0]);
    return result[0];
  },
  queryInvitation: async function (user) {
    let result = await knex.raw(`
        SELECT invitationId,requestId,inviteUsername FROM invitation
    `);
    console.log(result[0]);
    return result[0];
  },
  queryInsertRequestInfo: async function (obj) {
    await knex.raw(
      `
      INSERT INTO request(requestName,location,date,startingTime,endingTime,createUser,stateVegetarian)
      VALUE(?,?,?,?,?,?,?)
    `,
      [
        obj.name,
        obj.location,
        obj.date,
        obj.start,
        obj.end,
        obj.user,
        obj.state,
      ]
    );
    return;
  },
  getListOfRequest: async function () {
    // fetch request data from database (request)
    //browse request: showing requests
    const currDate = moment().format("YYYY-MM-DD");
    const currTime = moment().format("HH:mm:ss");
    let result = await knex.raw(
      `
          SELECT requestID, createUser, requestName, location, date, startingTime, endingTime, major, year, selfIntro, stateVegetarian 
          FROM request 
          LEFT JOIN account ON createUser = account.username
          WHERE (date > ? OR ( date = ? AND startingTime >= ?)  )
          AND stateFinish = 0
          ORDER BY date ASC
      `,
      [currDate, currDate, currTime]
    );
    return result[0];
  },
  insertInvitation: async function (obj) {
    await knex.raw(
      `
      INSERT INTO invitation(requestID,inviteUsername)
      VALUE(?, ?)
    `,
      [obj.requestID, obj.inviteUser]
    );
    return;
  },
  getMyRequest: async function (username) {
    return await knex("request")
      .select("*")
      .where({ createUser: username, stateFinish: 0 });
  },
  getInvitation: async function (requestID) {
    return await knex("invitation")
      .select(
        "requestID",
        "username",
        "displayName",
        "year",
        "major",
        "college",
        "selfIntro"
      )
      .join("account", "account.username", "=", "invitation.inviteUsername")
      .where({ requestID: requestID })
      .groupBy("account.username");
  },
  acceptInvitation: async function (obj) {
    await knex("chatroom_pair").insert({
      username_A: obj.username_A,
      username_B: obj.username_B,
      requestID: obj.requestID,
    });
    await knex("request")
      .update({ stateFinish: 1 })
      .where({ requestID: obj.requestID });
    return;
  },
};
