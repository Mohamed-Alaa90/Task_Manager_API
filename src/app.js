const express = require("express")
const app = express();

app.use(express.json());

const userRouter = require("./router/User.Route.js");
app.use("/api/users", userRouter);
module.exports = app