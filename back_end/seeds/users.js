exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex("test").del();

  const users = [
    { name: "Kevin" },
    { name: "Dickson" },
    { name: "Paul" },
    { name: "Thomas" },
    { name: "Thomas" }
  ]; //json in array

  return knex.batchInsert("test", users);
};
