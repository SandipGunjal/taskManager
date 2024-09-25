import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/taskForm.css";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  width: 100%;
  background-color: #c82333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // to get the task id for editing
  const navigate = useNavigate(); // to redirect after creation or update

  useEffect(() => {
    if (id) {
      // Fetch task details for editing
      console.log("Fetching task details for ID:", id);
      const token = localStorage.getItem("token");
      console.log("Using token:", token);

      if (!token) {
        setError("No token found in localStorage");
        return;
      }

      axios
        .get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTask(response.data);
          console.log("response", response);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error); // Log the error
          setError(
            error.response ? error.response.data.message : "An error occurred"
          );
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("Config-->", config);

    if (id) {
      // Update existing task
      axios
        .put(`http://localhost:5000/api/tasks/${id}`, task, config)
        .then((response) => {
          navigate("/tasks"); // redirect to task list after update
        })
        .catch((error) => {
          setError(
            error.response ? error.response.data.message : "An error occurred"
          );
          setLoading(false);
        });
    } else {
      // Create new task
      axios
        .post("http://localhost:5000/api/tasks", task, config)
        .then((response) => {
          console.log(response);

          navigate("/tasks"); // redirect to task list after creation
        })
        .catch((error) => {
          setError(
            error.response ? error.response.data.message : "An error occurred"
          );
          setLoading(false);
        });
    }
  };

  return (
    <div className="task-form-container">
      <h2>{id ? "Edit Task" : "Create Task"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate ? task.dueDate.split("T")[0] : ""}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
