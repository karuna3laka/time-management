import { Droppable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import './KanbanBoard.css';

const Column = ({ column, tasks, onToggle, onDelete, onStart }) => {
  return (
    <div className="column">
      <h3 className="column-title">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
                onStart={onStart}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;