const knex = require("knex")(require("../../knexfile.js")["development"]);

module.exports = {
  queryLocationList: async function() {
    let result = await knex.raw(`
        SELECT restaurantName FROM restaurant_details
    `);
    console.log(result[0]);
      result[0]=JSON.stringify(result[0]);       
    return result[0];
  },
  queryRequest: async function(user) {
    let result = await knex.raw(`
        SELECT requestId,requestName,location,date,startingTime,endingTime FROM request
    `,
    );
    console.log(result[0]);
    return result[0];
  },
  queryInvitation: async function(user) {
    let result = await knex.raw(`
        SELECT invitationId,requestId,inviteUsername FROM invitation
    `,
    );
    console.log(result[0]);
    return result[0];
  },
  queryInsertRequestInfo: async function(obj) {
    await knex.raw(
      `
      INSERT INTO request(requestName,location,date,startingTime,endingTime,createUser,stateVegetarian)
      VALUE(?, ?,?,?,?,?,?)
    `,
      [obj.name, obj.location,obj.date,obj.start,obj.end,obj.user,obj.state]
    );
    return;
  },
};
