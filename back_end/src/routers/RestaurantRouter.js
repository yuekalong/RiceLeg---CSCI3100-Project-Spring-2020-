/*
 * COMPONENT NAME: RESTAURANTROUTER
 * PROGRAMMER: YUE KA LONG, TU CHEN HSIEN
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE AUTHENICATATION ROUTER OF THE EXPRESS.JS.
 *          ROUTER IS HELPS TO ASSIGN THE ROUTE FOR DOING CERTAIN ACTIONS.
 *
 */

const express = require("express");
const router = express.Router();
const controllers = require("../controllers/RestaurantController.js");

// this is the route for getting the restaurant information
router.get("/getAllRestaurant", controllers.getAllRestaurant);

// this is the route for geting the comment and rating with respect to each restaurant
router.get("/getComment/:restaurantName", controllers.getComment);

// this is the route for posting new comment and rating
router.post("/commentAndRating", controllers.commentAndRating);

module.exports = router;
