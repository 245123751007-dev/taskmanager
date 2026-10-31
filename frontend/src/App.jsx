import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Design DB Schema', priority: 'High', completed: true },
    { id: '2', title: 'Implement REST APIs', priority: 'Medium', completed: false }
  ]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = { id: Date.now().toString(), title, priority, completed: false };
    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <form onSubmit={addTask} className="form-group">
        <input 
          type="text" 
          placeholder="Enter a new task..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(task.id)} style={{ cursor: 'pointer' }}>
              [{task.priority}] {task.title}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
