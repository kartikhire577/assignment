import { useState } from "react";
import "./App.css";

export default function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const check = () => {
    const v = value.trim();
    if (v === "") return setResult({ ok: false, text: "Input is blank. Please enter a number." });
    if (!/^-?\d+$/.test(v)) return setResult({ ok: false, text: `"${v}" is not a valid number.` });
    const sum = v.replace("-", "").split("").reduce((acc, d) => acc + Number(d), 0);
    setResult({ ok: true, text: `${v} is a valid number. Sum of its digits = ${sum}` });
  };

  return (
    <div className="container">
      <h1>Digit Sum</h1>
      <label>Enter a number</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 12345" />
      <button onClick={check}>Check</button>
      {result && <p className={result.ok ? "success" : "error"}>{result.text}</p>}
    </div>
  );
}
