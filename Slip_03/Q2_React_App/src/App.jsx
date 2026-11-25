import { useState } from "react";
import "./App.css";

export default function App() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="page" style={{ background: isOn ? "#22c55e" : "#ef4444" }}>
      <div className="container center">
        <h1>Switch is {isOn ? "ON" : "OFF"}</h1>
        <button onClick={() => setIsOn(!isOn)}>{isOn ? "Turn OFF" : "Turn ON"}</button>
      </div>
    </div>
  );
}
