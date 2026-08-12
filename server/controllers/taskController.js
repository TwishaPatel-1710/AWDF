let tasks = [
  {
    id: 1,
    title: "Complete Practical 4",
    completed: false
  },
  {
    id: 2,
    title: "Learn Node.js and Express",
    completed: false
  }
];

function getAllTasks(req, res) {
  res.status(200).json(tasks);
}

function createTask(req, res) {
  const { title, completed } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title: title,
    completed: completed || false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const id = parseInt(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, completed } = req.body;

  task.title = title ?? task.title;
  task.completed = completed ?? task.completed;

  res.status(200).json(task);
}

function deleteTask(req, res) {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  });
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};