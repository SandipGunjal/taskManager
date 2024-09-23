// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/taskForm.css';
import { useNavigate, useParams } from 'react-router-dom';

const TaskCreation = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    userId: '' // this can be replaced with the authenticated user's ID
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the task to edit
      axios.get(`http://localhost:5000/api/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the task!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Edit existing task
      axios.put(`http://localhost:5000/api/tasks/${id}`, task)
        .then((response) => {
          navigate('/');
        })
        .catch((error) => {
          console.error("There was an error updating the task!", error);
        });
    } else {
      // Create new task
      axios.post('http://localhost:5000/api/tasks', task)
        .then((response) => {
          navigate('/');
        })
        .catch((error) => {
          console.error("There was an error creating the task!", error);
        });
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            name="userId"
            value={task.userId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default TaskCreation;
