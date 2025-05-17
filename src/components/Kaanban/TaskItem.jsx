import { Draggable } from '@hello-pangea/dnd';
import './KanbanBoard.css';

const TaskItem = ({ task, index, onToggle, onDelete, onStart }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-item ${task.completed ? 'completed' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
                Start
              </button>
              <button
                className="action-button delete"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;