import { useState } from "react";
import "./App.css";

const operations = {
  "Uppercase": (s) => s.toUpperCase(),
  "Lowercase": (s) => s.toLowerCase(),
  "Length of String": (s) => s.length,
  "Reverse of String": (s) => [...s].reverse().join(""),
};

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const run = (label) => {
    if (!text) return setResult({ label: "Error", value: "Please enter a string first" });
    setResult({ label, value: operations[label](text) });
  };

  return (
    <div className="container">
      <h1>String Operations</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter a string" />
      <div>
        {Object.keys(operations).map((label) => (
          <button key={label} onClick={() => run(label)}>{label}</button>
        ))}
      </div>
      {result && <p><b>{result.label}:</b> {String(result.value)}</p>}
    </div>
  );
}
