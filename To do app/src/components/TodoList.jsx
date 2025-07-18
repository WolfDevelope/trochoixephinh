import { Button } from "antd";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, filter, toggleTodo,
  deleteCompletedTodo, deleteAllCompleted }) {
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="flex flex-col gap-2">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}
        showDelete={filter === "completed"}
        deleteCompletedTodo={deleteCompletedTodo} />
      ))}
      {filter === "completed" && filteredTodos.length > 0 && (
        <div className="flex justify-end mt-2">
          <Button danger onClick={deleteAllCompleted}>
            🗑️ delete all
          </Button>
        </div>
      )}
    </div>
  );
}