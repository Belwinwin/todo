import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure this import is here!

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch todos from backend
  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    fetchTodos();
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <form onSubmit={addTodo} className="todo-form">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn">Add</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo._id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                className="todo-checkbox"
              />
              <span className={`todo-text${todo.completed ? ' completed' : ''}`}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo._id)} className="todo-delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;