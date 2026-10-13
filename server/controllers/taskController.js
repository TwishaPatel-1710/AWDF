const taskEvents = require("../events/taskEvents");
require("../events/taskNotification");


const Task = require("../models/Task");
const cache = require("../utils/cache");

const CACHE_KEY = "allTasks";

async function getAllTasks(req, res, next) {
  try {
    // Check whether tasks are already cached.
    const cachedTasks = cache.get(CACHE_KEY);

    if (cachedTasks !== undefined) {
      res.set("X-Cache", "HIT");
      return res.status(200).json(cachedTasks);
    }

    // Cache miss: retrieve tasks from MongoDB.
    const tasks = await Task.find();

    // Save the result in cache for 60 seconds.
    cache.set(CACHE_KEY, tasks);

    res.set("X-Cache", "MISS");
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}


async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);

    // Invalidate the Practical 9 cache.
    cache.del(CACHE_KEY);

    const taskData = {
      title: task.title,
      assignedUser: req.user?.userId || "Unknown",
      createdAt: new Date().toISOString()
    };

    console.log("API response point:", new Date().toISOString());

    // Schedule the notification event without waiting for its handler.
    setImmediate(() => {
      taskEvents.emit("task-created", taskData);
    });

    // Return the response without waiting for notification processing.
    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}


async function updateTask(req, res, next) {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Invalidate cached tasks after successful update.
    cache.del(CACHE_KEY);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Invalidate cached tasks after successful deletion.
    cache.del(CACHE_KEY);

    res.status(200).json({
      message: "Task deleted successfully",
      task
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
