/*
 * COMPONENT NAME: AUTHSERVICES
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE AUTHENICATATION SERVICES OF THE EXPRESS.JS.
 *          SERVICES MEANS THAT DOING THE SERVICE EXACTLY IN HERE.
 *
 */

const knex = require("knex")(require("../../knexfile.js")["development"]);
const bcrypt = require("bcrypt");

module.exports = {
  // insert new user information into database (account)
  signUp: async function (newUser) {
    // insert the account information in backend
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
    // query the account information
    return await knex("account").select("*").where("username", "=", username);
  },
  updateProfile: async function (obj) {
    let password = await knex.raw(
      `
      SELECT password FROM account WHERE username = ?;
    `,
      [obj.username]
    );
    password = password[0][0].password;
    if (obj.oldpw != undefined) {
      // change password request with obj.oldpw not undefined
      if (!(await bcrypt.compare(obj.oldpw, password))) {
        // for checking entered old password correct or not
        throw "invalid old password";
      }
    }
    obj.password = await bcrypt.hash(obj.password, 10); // encrypt password
    await knex.raw(
      // updating profile with the passed object of the new information
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
  },
};
