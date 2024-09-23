// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/taskList.css';
import '../CSS/taskForm.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <div className="task-list-container">
    <Link to='/form'><button className='btn btn-primary'>ADD TASK</button></Link>
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
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <Link to={`/edit/${task._id}`}>Edit</Link>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
