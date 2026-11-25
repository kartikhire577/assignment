import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

const VALID_USER = "Admin";
const VALID_PASS = "Pass123";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === VALID_USER && form.password === VALID_PASS) {
      console.log("Valid credentials - login successful for", form.username);
      setMessage("");
      navigate("/welcome");
    } else {
      console.log("Invalid credentials");
      setMessage("Unauthorized Access");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        {message && <p className="error">{message}</p>}
        <button type="submit">Submit</button>
      </form>
      <p><small>Valid: Admin / Pass123</small></p>
    </div>
  );
}

const Welcome = () => (
  <div>
    <h1>Welcome, Admin!</h1>
    <p className="success">Login successful.</p>
    <Link to="/">Back to login</Link>
  </div>
);

const NotFound = () => <h1 className="error">404 Error, Page Not Found</h1>;

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
