import './TaskInput.css';

export function TaskInput({ value, onChange, onAdd }) {
  return (
    <div className="task-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add a New Task To Here"
        onKeyPress={(e) => e.key === 'Enter' && onAdd()}
      />
      <button className="add-button" onClick={onAdd}>
        ADD
      </button>
    </div>
  );
}