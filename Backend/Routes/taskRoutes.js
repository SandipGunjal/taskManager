// backend/routes/taskRoutes.js
const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controller/taskController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
