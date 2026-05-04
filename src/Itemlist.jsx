function Itemlist({ task, onDelete, onToggle, onEdit }) {
  return (
    <ul className="task-list">
      {task.map((item) => (
        <li key={item.id} className="task-item">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />

          <span
            className={`task-text ${
              item.completed ? "task-completed" : ""
            }`}
          >
            {item.text}
          </span>

          <button
            onClick={() => onDelete(item.id)}
            className="btn btn-delete"
          >
            Delete
          </button>

          <button
            onClick={() => onEdit(item.id)}
            className="btn btn-edit"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Itemlist;