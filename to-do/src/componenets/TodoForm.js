import React, { useEffect, useState } from "react";
import "./TodoForm.css";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const myTodos = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(myTodos);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const myTodos = JSON.stringify(todos);
    localStorage.setItem("todos", myTodos);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      text: input,
      id: Date.now(),
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setInput("");
  };

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="todo-main">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add to do"
          value={input}
          className="todo-input"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-todo">add to do</button>
      </form>
      {todos.map((todo) => (
        <ul>
          <li>
            <div key={todo.id} className="todo-list">
              <div className="todo-text">{todo.text}</div>
              <div className="right-side">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-todo"
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  onChange={() => toggleComplete(todo.id)}
                  checked={todo.completed}
                  className="checkbox"
                />
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default TodoForm;
