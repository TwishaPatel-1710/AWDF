import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


function Projects() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function fetchTasks() {

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Failed to fetch tasks"
        );

      }

      setTasks(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    fetchTasks();

  }, [token]);


  async function handleRegister(e) {

    e.preventDefault();

    try {

      setActionLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Registration failed"
        );

      }

      setName("");
      setEmail("");
      setPassword("");

      setShowRegister(false);

      setError("");

    } catch (err) {

      setError(err.message);

    } finally {

      setActionLoading(false);

    }

  }


  async function handleLogin(e) {

    e.preventDefault();

    try {

      setActionLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Login failed"
        );

      }

      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);

      setEmail("");
      setPassword("");

    } catch (err) {

      setError(err.message);

    } finally {

      setActionLoading(false);

    }

  }


  function handleLogout() {

    localStorage.removeItem("token");

    setToken(null);
    setTasks([]);
    setEditingId(null);

    setTitle("");
    setDescription("");

  }


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setActionLoading(true);
      setError("");

      const url = editingId
        ? `${API_URL}/tasks/${editingId}`
        : `${API_URL}/tasks`;

      const method = editingId
        ? "PUT"
        : "POST";


      const response = await fetch(
        url,
        {
          method: method,

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            title: title,
            description: description
          })
        }
      );


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

    setDescription(
      task.description || ""
    );

  }


  async function handleDelete(id) {

    try {

      setActionLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
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

    return (
      <section>
        <h2>Projects</h2>
        <p>Loading...</p>
      </section>
    );

  }


  if (!token) {

    return (

      <section>

        <h2>Projects</h2>

        {error && (
          <p>{error}</p>
        )}


        <div className="repo-card">

          <h3>
            {showRegister
              ? "Register"
              : "Login"}
          </h3>


          <form
            onSubmit={
              showRegister
                ? handleRegister
                : handleLogin
            }
          >

            {showRegister && (

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            )}


            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />


            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />


            <br />


            <button
              type="submit"
              className="btn1"
              disabled={actionLoading}
            >
              {actionLoading
                ? "Processing..."
                : showRegister
                  ? "Register"
                  : "Login"}
            </button>

          </form>


          <br />


          <button
            className="btn2"
            onClick={() => {

              setShowRegister(!showRegister);
              setError("");

            }}
          >
            {showRegister
              ? "Go to Login"
              : "Create Account"}
          </button>

        </div>

      </section>

    );

  }


  return (

    <section>

      <h2>Projects</h2>


      {error && (
        <p>{error}</p>
      )}


      <button
        className="btn2"
        onClick={handleLogout}
      >
        Logout
      </button>


      <div className="repo-card">

        <h3>
          {editingId
            ? "Edit Task"
            : "Add Task"}
        </h3>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />


          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
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

            <h3>
              {task.title}
            </h3>


            <p>
              {task.description}
            </p>


            <p>
              Status:{" "}
              {task.completed
                ? "Completed"
                : "Pending"}
            </p>


            <button
              className="btn1"
              onClick={() =>
                handleEdit(task)
              }
              disabled={actionLoading}
            >
              Edit
            </button>


            <button
              className="btn2"
              onClick={() =>
                handleDelete(task._id)
              }
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