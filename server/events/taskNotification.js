
const taskEvents = require("./taskEvents");

taskEvents.on("task-created", (taskData) => {
  // Run the notification handler asynchronously.
  setImmediate(() => {
    const timestamp = new Date().toISOString();

    console.log("----- TASK NOTIFICATION -----");
    console.log("Task Title:", taskData.title);
    console.log("Timestamp:", timestamp);
    console.log("Assigned User:", taskData.assignedUser);
    console.log("Notification handler executed.");
    console.log("-----------------------------");
  });
});

console.log("Task notification listener registered.");
