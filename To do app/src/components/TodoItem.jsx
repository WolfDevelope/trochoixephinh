import { Checkbox } from "antd";
import { DeleteOutlined } from '@ant-design/icons';


export default function TodoItem({ todo, toggleTodo,
  showDelete, deleteCompletedTodo }) {
  return (
    <div className="flex items-center justify-between">
    <div className="flex items-center">
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="mr-2"
      />
      <span
        className={`text-base ${todo.completed ? "line-through text-gray-400" : ""}`}
      >
        {todo.text}
      </span>
    </div>
    {showDelete && (
      <button
          className="ml-2 text-gray-400 hover:text-red-500 p-0"
          style={{ fontSize: 16 }}
          onClick={() => deleteCompletedTodo(todo.id)}
          tabIndex={-1}
        >
          <DeleteOutlined />
          </button>
      )}
    </div>
  );
}