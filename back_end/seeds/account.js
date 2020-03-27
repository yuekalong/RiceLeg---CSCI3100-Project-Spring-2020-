exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex("account").del();

  const accounts = [
    {
      username: "long",
      password: "1234",
      displayName: "long",
      email: "long@email.com",
      year: 3,
      major: "Computer Science",
      college: "Shaw College",
      selfIntro: "testing",
      propicID: null
    },
    {
      username: "harry",
      password: "1234",
      displayName: "harry",
      email: "harry@email.com",
      year: 3,
      major: "Computer Science",
      college: "Shaw College",
      selfIntro: "testing",
      propicID: null
    },
    {
      username: "jane",
      password: "1234",
      displayName: "jane",
      email: "jane@email.com",
      year: 3,
      major: "Computer Science",
      college: "Shaw College",
      selfIntro: "testing",
      propicID: null
    },
    {
      username: "charlie",
      password: "1234",
      displayName: "charlie",
      email: "charlie@email.com",
      year: 3,
      major: "Computer Science",
      college: "Shaw College",
      selfIntro: "testing",
      propicID: null
    },
    {
      username: "arthur",
      password: "1234",
      displayName: "arthur",
      email: "arthur@email.com",
      year: 3,
      major: "Computer Science",
      college: "Shaw College",
      selfIntro: "testing",
      propicID: null
    }
  ]; //json in array

  return knex.batchInsert("account", accounts);
};
