const Task = require("../models/Task.Model.js");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const task = await Task.create({
      title,
      description,
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created Successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    if (tasks.length === 0) {
      res.status(404).json({
        success: false,
        message: "no Tasks Found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "tasks fetched Successfully",
      data: [tasks],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = { createTask, getAllTasks };
