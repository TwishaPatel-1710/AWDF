import { useEffect, useState } from "react";

function Projects() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);


  async function fetchTasks() {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/tasks"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    fetchTasks();

  }, []);


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setActionLoading(true);
      setError("");

      const url = editingId
        ? `http://localhost:5000/tasks/${editingId}`
        : "http://localhost:5000/tasks";

      const method = editingId ? "PUT" : "POST";


      const response = await fetch(url, {

        method: method,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title: title,
          description: description
        })

      });


      const data = await response.json();


      if (!response.ok) {

        if (data.errors) {

          throw new Error(
            Object.values(data.errors).join(", ")
          );

        }

        throw new Error(
          data.message || "Request failed"
        );

      }


      setTitle("");
      setDescription("");
      setEditingId(null);

      await fetchTasks();

    } catch (err) {

      setError(err.message);

    } finally {

      setActionLoading(false);

    }

  }


  function handleEdit(task) {

    setEditingId(task._id);

    setTitle(task.title);

    setDescription(task.description || "");

  }


  async function handleDelete(id) {

    try {

      setActionLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Delete failed"
        );

      }


      await fetchTasks();

    } catch (err) {

      setError(err.message);

    } finally {

      setActionLoading(false);

    }

  }


  if (loading) {
    return <p>Loading...</p>;
  }


  return (

    <section>

      <h2>Projects</h2>

      {error && <p>{error}</p>}


      <div className="repo-card">

        <h3>
          {editingId ? "Edit Task" : "Add Task"}
        </h3>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />


          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          <br />


          <button
            type="submit"
            className="btn1"
            disabled={actionLoading}
          >
            {actionLoading
              ? "Processing..."
              : editingId
                ? "Update Task"
                : "Add Task"}
          </button>


          {editingId && (

            <button
              type="button"
              className="btn2"
              onClick={() => {

                setEditingId(null);
                setTitle("");
                setDescription("");

              }}
            >
              Cancel
            </button>

          )}

        </form>

      </div>


      {tasks.length === 0 ? (

        <div className="repo-card">

          <p>No tasks found.</p>

        </div>

      ) : (

        tasks.map((task) => (

          <div
            className="repo-card"
            key={task._id}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Status:{" "}
              {task.completed
                ? "Completed"
                : "Pending"}
            </p>


            <button
              className="btn1"
              onClick={() => handleEdit(task)}
              disabled={actionLoading}
            >
              Edit
            </button>


            <button
              className="btn2"
              onClick={() => handleDelete(task._id)}
              disabled={actionLoading}
            >
              Delete
            </button>

          </div>

        ))

      )}

    </section>

  );

}

export default Projects;