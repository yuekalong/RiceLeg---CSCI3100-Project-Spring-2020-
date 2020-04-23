const services = require("../services/RestaurantServices.js");
const { standardServiceResponse } = require("../utils/ResponseHandler");

module.exports = {
  getAllRestaurant: function (req, res, next) {
    try {
      console.log("RestaurantController.getAllRestaurant started!");
      return standardServiceResponse(res, next, services.getAllRestaurant());
    } catch (err) {
      console.log(
        "Error: RestaurantController.getAllRestaurant: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  getComment: function (req, res, next) {
    try {
      console.log("RestaurantController.getComment started!");
      const restaurantName = req.params.restaurantName;
      return standardServiceResponse(
        res,
        next,
        services.getComment(restaurantName)
      );
    } catch (err) {
      console.log(
        "Error: RestaurantController.getComment: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
  commentAndRating: function (req, res, next) {
    try {
      console.log("RestaurantController.commentAndRating started!");
      const obj = JSON.parse(req.body.obj);
      return standardServiceResponse(res, next, services.commentAndRating(obj));
    } catch (err) {
      console.log(
        "Error: RestaurantController.commentAndRating: " +
          JSON.parse(err.message)["message"]
      );
      next(err);
    }
  },
};
