// App.jsx
import React from "react";
import TodoInput from "./components/TodoInput";
import FilterTabs from "./components/FilterTabs";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

export default function App() {
  const {
    todos, filter, addTodo, toggleTodo, setFilter,
    deleteCompletedTodo, deleteAllCompleted
  } = useTodos();

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">#todo</h1>
      <FilterTabs filter={filter} setFilter={setFilter} />
      {filter !== "completed" && <TodoInput addTodo={addTodo} />}
      <TodoList
        todos={todos}
        filter={filter}
        toggleTodo={toggleTodo}
        deleteCompletedTodo={deleteCompletedTodo}
        deleteAllCompleted={deleteAllCompleted}
      />
    </div>
  );
}