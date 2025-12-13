const { default: mongoose } = require("mongoose");
const Task = require("../models/Task.Model.js");

const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const task = await Task.create({
      title,
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

    res.status(200).json({
      success: true,
      message: "tasks fetched Successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Body cannot be empty",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task Id",
      });
    }
    const { title, completed } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updateData,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
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

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task Id",
      });
    }
    const task = await Task.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = { createTask, getAllTasks, updateTask, deleteTask };
