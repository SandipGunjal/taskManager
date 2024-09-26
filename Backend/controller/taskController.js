const Task = require("../Model/taskModel");
const { format } = require("date-fns");

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    // const formattedDate = Task.dueDate ? format(Task.dueDate, 'dd MMM yyyy') : null;

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    // Create a new task, associated with the logged-in user
    const newTask = await Task.create({
      userId: req.user._id,
      title,
      description,
      status,
      dueDate,
    });
    res.status(201).json({message:'Successfully Add Task',newTask});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, dueDate },
      { new: true }
    );
    res.json({message:'Updated Successful',updatedTask});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
