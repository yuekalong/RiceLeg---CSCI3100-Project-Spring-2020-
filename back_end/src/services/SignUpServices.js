const knex = require("knex")(require("../../knexfile.js")["development"]);

module.exports = {
  queryInsertUserInfo: async function(obj) {
    await knex.raw(
      `
      INSERT INTO request(username,password,email,major,year,college)
      VALUE(?, ?,?,?,?,?)
    `,
      [obj.name, obj.password,obj.email,obj.major,obj.year,obj.college]
    );
    return;
  },
};
