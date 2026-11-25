import { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";

const users = [
  { id: 1, username: "alice", password: "alice123", name: "Alice Sharma", email: "alice@example.com", city: "Pune" },
  { id: 2, username: "bob", password: "bob123", name: "Bob Patil", email: "bob@example.com", city: "Mumbai" },
  { id: 3, username: "carol", password: "carol123", name: "Carol Deshmukh", email: "carol@example.com", city: "Nagpur" },
];

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === form.username && u.password === form.password);
    if (user) navigate(`/user/${user.id}`);        // pass the id through the route
    else setError("Invalid username or password");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p><small>Try alice/alice123, bob/bob123 or carol/carol123. Or open /user/1, /user/2 ...</small></p>
    </div>
  );
}

function UserDetails() {
  const { id } = useParams();                       // read :id from the URL
  const user = users.find((u) => u.id === Number(id));

  if (!user) return (<div><h1 className="error">User not found</h1><Link to="/">Back to login</Link></div>);

  return (
    <div>
      <h1>User Details</h1>
      <table>
        <tbody>
          <tr><th>ID</th><td>{user.id}</td></tr>
          <tr><th>Name</th><td>{user.name}</td></tr>
          <tr><th>Username</th><td>{user.username}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>City</th><td>{user.city}</td></tr>
        </tbody>
      </table>
      <p><Link to="/">Logout</Link></p>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="*" element={<h1 className="error">404 Error, Page Not Found</h1>} />
      </Routes>
    </div>
  );
}
