const knex = require("knex")(require("../../knexfile.js")["development"]);
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async function (newUser) {
    return await knex("account").insert({
      username: newUser.username,
      password: await bcrypt.hash(newUser.password, 10),
      displayName: newUser.displayName,
      email: newUser.email,
      year: newUser.year,
      major: newUser.major,
      college: newUser.college,
      selfIntro: newUser.selfIntro,
    });
  },
  queryAccountInform: async function (username) {
    return await knex("account").select("*").where("username", "=", username);
  },
  updateProfile: async function (obj) {
    // for checking entered old password correct or not
    let password = await knex.raw(
      `
      SELECT password FROM account WHERE username = ?;
    `,
      [obj.username]
    );
    password = password[0][0].password;
    if (obj.oldpw != undefined) {
      if (!(await bcrypt.compare(obj.oldpw, password))) {
        throw "invalid old password";
      }
    }

    obj.password = await bcrypt.hash(obj.password, 10);
    await knex.raw(
      `
      UPDATE account SET password = ?, displayName = ?, email = ?, year = ?, major = ?, college = ?, selfIntro = ?
      WHERE username = ?;
    `,
      [
        obj.password,
        obj.displayName,
        obj.email,
        obj.year,
        obj.major,
        obj.college,
        obj.selfIntro,
        obj.username,
      ]
    );
    return;

    // obj.password = await bcrypt.hash(obj.password, 10)
    // obj.password = await bcrypt.hash(obj.password, 10)
  },
};
