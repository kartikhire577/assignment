import { useState } from "react";
import "./App.css";

export default function App() {
  const [num, setNum] = useState("");
  const [str, setStr] = useState("");
  const [numMsg, setNumMsg] = useState(null);
  const [strMsg, setStrMsg] = useState(null);

  const checkNumber = () => {
    if (num.trim() === "" || !/^-?\d+$/.test(num.trim()))
      return setNumMsg({ ok: false, text: "Please enter a valid integer." });
    setNumMsg({ ok: true, text: `${num.trim()} is ${Number(num) % 2 === 0 ? "an Even" : "an Odd"} number.` });
  };

  const checkString = () => {
    if (str.trim() === "") return setStrMsg({ ok: false, text: "Please enter a string." });
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isPal = clean === [...clean].reverse().join("");
    setStrMsg({ ok: isPal, text: `"${str}" is ${isPal ? "" : "not "}a palindrome.` });
  };

  return (
    <div className="container">
      <h1>Even/Odd &amp; Palindrome</h1>
      <label>Enter a number</label>
      <input value={num} onChange={(e) => setNum(e.target.value)} />
      <button onClick={checkNumber}>Check Even / Odd</button>
      {numMsg && <p className={numMsg.ok ? "success" : "error"}>{numMsg.text}</p>}
      <hr />
      <label>Enter a string</label>
      <input value={str} onChange={(e) => setStr(e.target.value)} />
      <button onClick={checkString}>Check Palindrome</button>
      {strMsg && <p className={strMsg.ok ? "success" : "error"}>{strMsg.text}</p>}
    </div>
  );
}
