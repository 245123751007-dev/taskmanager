const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Task = require('./models/Task');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your MongoDB URI if needed)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Routes
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
