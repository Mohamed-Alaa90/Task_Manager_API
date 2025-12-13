const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controller/TaskController.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/createTask", authMiddleware, createTask);
router.get("/getAllTasks", authMiddleware, getAllTasks);
router.put("/updatedTask/:id", authMiddleware, updateTask);
router.delete("/deleteTask/:id", authMiddleware, deleteTask);

module.exports = router;
