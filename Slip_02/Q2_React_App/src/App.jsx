import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect with [] runs once after the first render
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Users fetched from API:", data);
        console.table(data.map(({ id, name, email }) => ({ id, name, email })));
        setUsers(data);
      })
      .catch((err) => {
        console.error("Fetch failed:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Users List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
