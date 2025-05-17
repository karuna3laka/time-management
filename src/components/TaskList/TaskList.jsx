import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './TaskList.css';

export function TaskList({ tasks, activeTask, onToggle, onDelete, onStart, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div 
            className="task-list-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ul className="task-list">
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-item ${task.completed ? 'completed' : ''} ${activeTask === task.id ? 'active' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => onToggle(task.id)}
                          className="task-checkbox"
                        />
                        <span className="task-title">{task.title}</span>
                        <div className="task-actions">
                          <button
                            className={`action-button start ${task.completed ? 'disabled' : ''}`}
                            onClick={() => onStart(task.id)}
                            disabled={task.completed}
                          >
                            {activeTask === task.id ? 'Stop' : 'Start'}
                          </button>
                          <button
                            className="action-button delete"
                            onClick={() => onDelete(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}