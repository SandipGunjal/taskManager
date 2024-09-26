import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../CSS/taskList.css";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const formattedTasks = response.data.map((task) => {
          const dueDate = new Date(task.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return { ...task, dueDate }; // Updating dueDate with the formatted version
        });
        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success(response.data.message)

      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <div className="task-list-container">
      <Link to="/tasks/new">
        <button className="btn btn-primary mb-3">Create New Task</button>
      </Link>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <span className={`status ${task.status}`}>{task.status}</span>
              </td>
              <td>{task.dueDate}</td>
              <td>
                <Link to={`/tasks/edit/${task._id}`} className="icon-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <Link
                  onClick={() => handleDelete(task._id)}
                  className="icon-btn delete-btn"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
