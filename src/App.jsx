import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskInput } from './components/TaskInput/TaskInput';
import { Timer } from './components/Timer/Timer';
import { TaskList } from './components/TaskList/TaskList';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: false },
    { id: '3', title: 'Task 3', completed: true },
  ]);
  const [activeTask, setActiveTask] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTask === id) {
      setActiveTask(null);
    }
  };

  const handleStart = (id) => {
    setActiveTask(id);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now().toString(),
        title: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <h1>My Tasks</h1>
        <Timer 
          activeTask={activeTask} 
          onStart={handleStart} 
          onStop={() => setActiveTask(null)} 
        />
        <TaskInput 
          value={newTask} 
          onChange={setNewTask} 
          onAdd={handleAddTask} 
        />
        <TaskList
          tasks={tasks}
          activeTask={activeTask}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onStart={handleStart}
          onDragEnd={handleDragEnd}
        />
      </main>
    </div>
  );
}

export default App;
