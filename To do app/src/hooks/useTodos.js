import { useState } from "react";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteCompletedTodo = (id) => {
    setTodos(todos => todos.filter(todo => !(todo.completed && todo.id === id)));
  };
  
  const deleteAllCompleted = () => {
    setTodos(todos => todos.filter(todo => !todo.completed));
  };
  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteCompletedTodo,
    deleteAllCompleted
  };
}