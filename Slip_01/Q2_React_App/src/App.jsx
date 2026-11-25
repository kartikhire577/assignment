import { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({ username: "", password: "" });

  // onChange: keeps React state in sync with the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log("onChange ->", name, ":", value);
  };

  // onInput: fires on every raw input event
  const handleInput = (e) => {
    console.log("onInput  ->", e.target.name, ":", e.target.value);
  };

  // onSubmit: log the entered values
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit -> Username:", form.username, "| Password:", form.password);
  };

  return (
    <div className="container">
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" placeholder="Enter username"
               value={form.username} onChange={handleChange} onInput={handleInput} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter password"
               value={form.password} onChange={handleChange} onInput={handleInput} required />
        <button type="submit">Login</button>
      </form>
      <p>Open the browser console (F12) to see the logged values.</p>
    </div>
  );
}
