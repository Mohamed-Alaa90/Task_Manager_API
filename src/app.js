const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRouter = require("./router/User.Route.js");
const taskRouter = require("./router/Task.Route.js");

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

module.exports = app;
