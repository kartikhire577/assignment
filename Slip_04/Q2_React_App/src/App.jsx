import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Home() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return setMsg({ ok: false, text: "Email is required" });
    if (!emailRe.test(email)) return setMsg({ ok: false, text: "Enter a valid email address" });
    setMsg({ ok: true, text: "Subscribed with " + email });
    setEmail("");
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the multi-page React application built with react-router-dom.</p>
      <form onSubmit={submit} noValidate>
        <label>Subscribe to our newsletter</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        {msg && <p className={msg.ok ? "success" : "error"}>{msg.text}</p>}
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This app demonstrates client side routing: Home, About and Contact pages without page reloads.</p>
      <ul>
        <li>Built with React and Vite</li>
        <li>Routing by react-router-dom</li>
        <li>Form validation on Home and Contact</li>
      </ul>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const err = {};
    if (form.name.trim().length < 3) err.name = "Name must be at least 3 characters";
    if (!emailRe.test(form.email)) err.email = "Enter a valid email address";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters";
    return err;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    setSent(Object.keys(err).length === 0);
    if (Object.keys(err).length === 0) setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={submit} noValidate>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        <label>Message</label>
        <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
        {errors.message && <p className="error">{errors.message}</p>}
        <button type="submit">Send</button>
        {sent && <p className="success">Message sent successfully!</p>}
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="container wide">
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
