const express = require("express");

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const { validateTask } = require("../middleware/validate");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllTasks);

router.post("/", validateTask, createTask);

router.put("/:id", validateTask, updateTask);

router.delete("/:id", deleteTask);

module.exports = router;