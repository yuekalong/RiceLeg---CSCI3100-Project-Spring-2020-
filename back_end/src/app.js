/*
 * MODULE NAME: APP
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS THE EXPRESS APP OF THE BACK-END.
 *          IT HELPS TO SET ALL THE EXPRESS REQUIRED PLUGINS AND THE ROUTERS
 *
 *
 */
// importing the express
const express = require("express");
const app = express();

// import socket and set the socket
const server = require("http").Server(app);
const io = require("socket.io")(server);

// import passport and set the passport
const auth = require("./init-passport");

// import bodyParser for get the request body
const bodyParser = require("body-parser");

// import cors to set the CORS
const cors = require("cors");
const corsOptions = {
  origin: ["http://www.example.com", "http://localhost:8080"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// make the express app use the plugin
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(auth.session());

// import all the Router
const testRouter = require("./routers/TestRouter.js");
const authRouter = require("./routers/AuthRouter.js");
const chatroomRouter = require("./routers/ChatroomRouter.js");
const requestRouter = require("./routers/RequestRouter.js");
const restaurantRouter = require("./routers/RestaurantRouter.js");

// make the express app use the Router
app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/matching", requestRouter);
app.use("/chatroom", auth.authenticate, chatroomRouter(io));
app.use("/restaurant", restaurantRouter);

// set the port 3000 for express server
server.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
