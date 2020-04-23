const express = require("express");
const app = express();
// socket setting
const server = require("http").Server(app);
const io = require("socket.io")(server);
// passport setting
const auth = require("./init-passport");

// plugins setting
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: ["http://www.example.com", "http://localhost:8080"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// plugins declaration
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth.initialize());
app.use(auth.session());

const testRouter = require("./routers/TestRouter.js");
const authRouter = require("./routers/AuthRouter.js");
const chatroomRouter = require("./routers/ChatroomRouter.js");
const requestRouter = require("./routers/RequestRouter.js");
const restaurantRouter = require("./routers/RestaurantRouter.js");

app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/matching", requestRouter);
app.use("/chatroom", auth.authenticate, chatroomRouter(io));
app.use("/restaurant", restaurantRouter);

server.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
