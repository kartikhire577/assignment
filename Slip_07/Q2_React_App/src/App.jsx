import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: text.trim() }]);
    setText("");
  };

  const removeTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="container">
      <h1>TODO List</h1>
      <form onSubmit={addTask} className="row">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter a new task" />
        <button type="submit">Add</button>
      </form>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text}
            <button className="danger" style={{ marginLeft: 10, padding: "2px 10px" }} onClick={() => removeTask(t.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
