const knex = require("knex")(require("../../knexfile.js")["development"]);

module.exports = {
  getAllRestaurant: async function () {
    return await knex("restaurant_details").select("*");
  },
  getComment: async function (restaurantName) {
    return await knex("feedback")
      .select("*")
      .where({ restaurantName: restaurantName });
  },
  commentAndRating: async function (obj) {
    return await knex("feedback").insert({
      restaurantName: obj.restaurantName,
      opinion: obj.opinion,
      rating: obj.rating,
    });
  },
};
