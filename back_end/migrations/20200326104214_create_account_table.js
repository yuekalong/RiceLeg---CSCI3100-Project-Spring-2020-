exports.up = function(knex) {
  return knex.schema.createTable("account", table => {
    table.string("username").primary();
    table.string("password").notNullable();
    table.string("displayName");
    table.string("email").notNullable();
    table.integer("year").unsigned();
    table.string("major");
    table.string("college");
    table.string("selfIntro");
    table.string("propicID");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("account");
};
