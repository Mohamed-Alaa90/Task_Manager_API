const express = require("express");
const router = express.Router();
const { createTask, getAllTasks } = require("../controller/TaskController.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/createTask", authMiddleware, createTask);
router.get("/getAllTasks", authMiddleware, getAllTasks);

module.exports = router;
