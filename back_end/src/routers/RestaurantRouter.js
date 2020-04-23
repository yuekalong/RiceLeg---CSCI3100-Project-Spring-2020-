const express = require("express");
const router = express.Router();
const controllers = require("../controllers/RestaurantController.js");

router.get("/getAllRestaurant", controllers.getAllRestaurant);
router.get("/getComment/:restaurantName", controllers.getComment);
router.post("/commentAndRating", controllers.commentAndRating);

module.exports = router;
