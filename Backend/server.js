// backend/server.js
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./Routes/authRoute');
const taskRoutes = require('./Routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
