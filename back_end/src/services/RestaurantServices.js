/*
 * COMPONENT NAME: RESTAURANTSERVICES
 * PROGRAMMER: YUE KA LONG, LAU PING TUNG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE RESTAURANT SERVICES OF THE EXPRESS.JS.
 *          SERVICES MEANS THAT DOING THE SERVICE EXACTLY IN HERE.
 *
 *
 */

const knex = require("knex")(require("../../knexfile.js")["development"]);

module.exports = {
  getAllRestaurant: async function () {
    // by defining const knex to th right local db. we select all from db restaurant_details.
    return await knex("restaurant_details").select("*");
  },
  getComment: async function (restaurantName) {
    // the obtained value restaurantName in controller is sent to service as parameter and get info from db feedback.
    return await knex("feedback")
      .select("*")
      .where({ restaurantName: restaurantName });
  },
  commentAndRating: async function (obj) {
    // the req.body.obj is sent here and retrieve its value by obj.key to the db respectively
    return await knex("feedback").insert({
      restaurantName: obj.restaurantName,
      opinion: obj.opinion,
      rating: obj.rating,
    });
  },
};
