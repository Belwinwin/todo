import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch todos from backend
  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/todos');
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
    await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    fetchTodos();
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>To-Do List</h2>
      <form onSubmit={addTodo} style={{ marginBottom: '1rem' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task"
          style={{ width: '70%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>Add</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo._id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                style={{ marginRight: 8 }}
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                flexGrow: 1
              }}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 8 }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;