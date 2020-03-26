const express = require("express");
const app = express();
// socket setting
const server = require("http").Server(app);
const io = require("socket.io")(server);

// plugins setting
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: ["http://www.example.com", "http://localhost:8080"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"]
};

// plugins declaration
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const testRouter = require("./routers/TestRouter.js");
const chatroomRouter = require("./routers/ChatroomRouter.js");

app.use("/test", testRouter);

app.use("/chatroom", chatroomRouter(io));

server.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
