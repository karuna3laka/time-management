import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskInput } from './components/TaskInput/TaskInput';
import { Timer } from './components/Timer/Timer';
import { TaskList } from './components/TaskList/TaskList';
import SpotlightCard from './components/SpotlightCard/SpotlightCard';
import KanbanBoard from './components/Kaanban/KanbanBoard';
import Particles from './components/Particles/Particles';




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
    <div className="MainPanel">
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
            
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
      
      <div className="app-container1">
        <div style={{ 
                width: '100%', 
                height: '600px', 
                position: 'relative',
                background: 'linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(1, 5, 10) 100%)' // Example gradient
              }}>
                <Particles
                  particleColors={['#ffffff', '#ffffff']}
                  particleCount={2000}
                  particleSpread={10}
                  speed={0.4}
                  particleBaseSize={100}
                  moveParticlesOnHover={true}
                  alphaParticles={false}
                  disableRotation={false}
                />
                
              </div>
        {/* Add any additional components you want in the blue area */}
      </div>
      <div className="app-container2">
        <KanbanBoard
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onStart={handleStart}
          />
        {/* Add any additional components you want in the blue area */}
      </div>

      
      
    </div>
  );
}

export default App;