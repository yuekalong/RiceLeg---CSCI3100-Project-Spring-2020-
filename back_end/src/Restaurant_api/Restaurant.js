const express = require('express');
const restaurant = express.Router();
const routers = require('./src/Routers.js');
const cors = require("cors");

const corsOptions = {
  origin: ["http://www.example.com", "http://localhost:8080"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"]
};
//restaurant.use(cors(corsOptions));
// restaurant.use('/restaurant',routers);
restaurant.get("/xd",function(req,res,data){
  console.log("xd router is connected")
  res.end("xd route is connected!");
})

module.exports = restaurant;