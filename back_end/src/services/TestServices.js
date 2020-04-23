const knex = require("knex")(require("../../knexfile.js")["development"]);

module.exports = {
  showHelloWorldService: async function () {
    return "Hello World";
  },
  querySomeData: async function () {
    let result = await knex.raw(`
        SELECT id, name FROM test
    `);
    console.log(result[0]);
    return result[0];
  },
  queryInsertData: async function (obj) {
    await knex.raw(
      `
      INSERT INTO test(id, name)
      VALUES(?, ?)
    `,
      [obj.id, obj.name]
    );
    return;
  },
};
