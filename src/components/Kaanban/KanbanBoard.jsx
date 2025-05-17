import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './Column';
import { useState, useEffect } from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ tasks, onToggle, onDelete, onStart }) => {
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: tasks.filter(task => !task.completed && !task.inProgress && !task.inReview).map(task => task.id)
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: tasks.filter(task => task.inProgress && !task.completed).map(task => task.id)
    },
    review: {
      id: 'review',
      title: 'Review',
      taskIds: tasks.filter(task => task.inReview && !task.completed).map(task => task.id)
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      taskIds: tasks.filter(task => task.completed).map(task => task.id)
    }
  });

  // Update columns when tasks change
  useEffect(() => {
    setColumns({
      todo: {
        ...columns.todo,
        taskIds: tasks.filter(task => !task.completed && !task.inProgress && !task.inReview).map(task => task.id)
      },
      inProgress: {
        ...columns.inProgress,
        taskIds: tasks.filter(task => task.inProgress && !task.completed).map(task => task.id)
      },
      review: {
        ...columns.review,
        taskIds: tasks.filter(task => task.inReview && !task.completed).map(task => task.id)
      },
      completed: {
        ...columns.completed,
        taskIds: tasks.filter(task => task.completed).map(task => task.id)
      }
    });
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Moving within same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn
      });
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    // Update task status based on column movement
    const movedTaskIndex = tasks.findIndex(task => task.id === draggableId);
    const updatedTasks = [...tasks];
    
    // Reset all status flags
    updatedTasks[movedTaskIndex] = {
      ...updatedTasks[movedTaskIndex],
      inProgress: false,
      inReview: false,
      completed: false
    };

    // Set the appropriate status based on destination column
    if (destination.droppableId === 'inProgress') {
      updatedTasks[movedTaskIndex].inProgress = true;
    } else if (destination.droppableId === 'review') {
      updatedTasks[movedTaskIndex].inReview = true;
    } else if (destination.droppableId === 'completed') {
      updatedTasks[movedTaskIndex].completed = true;
    }

    // You'll need to update your state management to handle these new status fields
    // This might involve modifying your handleToggle function or creating new handlers

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    });

    // Here you would call your state update function (like setTasks)
    // For example: updateTasks(updatedTasks);
    // You'll need to implement this function in your parent component
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {Object.values(columns).map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter(task => column.taskIds.includes(task.id))}
            onToggle={onToggle}
            onDelete={onDelete}
            onStart={onStart}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;