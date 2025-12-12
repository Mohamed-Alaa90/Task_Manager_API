const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRouter = require("./router/User.Route.js");
app.use("/api/users", userRouter);

module.exports = app;
