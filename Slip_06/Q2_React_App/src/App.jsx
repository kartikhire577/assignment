import { createContext, useContext, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
import "./App.css";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Mock authentication: no server, just compare with fixed credentials
  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      setUser({ name: username });
      return true;
    }
    return false;
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) navigate(location.state?.from || "/dashboard", { replace: true });
    else setError("Invalid username or password");
  };

  return (
    <div>
      <h2>Login</h2>
      {location.state?.from && <p className="error">Please log in to access {location.state.from}</p>}
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p><small>Mock credentials: admin / 1234</small></p>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Dashboard (Protected)</h2>
      <p className="success">Authentication successful! Welcome, {user.name}. You can see this protected page.</p>
      <button className="danger" onClick={logout}>Logout</button>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Public Home</h2>
      <p>Anyone can see this page.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="container">
        <nav><Link to="/">Home</Link><Link to="/dashboard">Dashboard</Link></nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
