module.exports = {
  development: {
    client: "mysql",
    version: "8.0.12",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "1234",
      database: "csci3100_db"
    },
    debug: true,
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
