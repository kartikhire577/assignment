import { useState } from "react";
import "./App.css";

export default function App() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="container center">
      <h1>Toggle Button</h1>
      <button
        onClick={() => setIsOn(!isOn)}
        style={{ background: isOn ? "#16a34a" : "#dc2626", color: "#fff", fontSize: "1.5rem", padding: "14px 40px" }}
      >
        {isOn ? "ON" : "OFF"}
      </button>
      <p style={{ display: "inline-block", padding: "6px 14px", borderRadius: 6, color: "#fff",
                  background: isOn ? "#16a34a" : "#dc2626" }}>
        State: {isOn ? "ON" : "OFF"}
      </p>
    </div>
  );
}
