import { useState } from "react";
import "./App.css";

const calc = (a, b, op) => {
  a = parseFloat(a);
  b = parseFloat(b);
  let r;
  switch (op) {
    case "+": r = a + b; break;
    case "-": r = a - b; break;
    case "×": r = a * b; break;
    case "÷": if (b === 0) return "Error"; r = a / b; break;
    default: r = b;
  }
  return Number(r.toFixed(10));
};

export default function App() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(false);   // next digit starts a new number

  const digit = (d) => {
    if (fresh || display === "0" || display === "Error") { setDisplay(String(d)); setFresh(false); }
    else setDisplay(display + d);
  };

  const dot = () => {
    if (fresh || display === "Error") { setDisplay("0."); setFresh(false); return; }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const operator = (o) => {
    if (display === "Error") return;
    if (op && !fresh) {
      const r = calc(prev, display, op);
      setDisplay(String(r));
      setPrev(r);
    } else setPrev(display);
    setOp(o);
    setFresh(true);
  };

  const equals = () => {
    if (!op || display === "Error") return;
    setDisplay(String(calc(prev, display, op)));
    setPrev(null); setOp(null); setFresh(true);
  };

  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); setFresh(false); };
  const back = () => setDisplay(display.length > 1 && !fresh && display !== "Error" ? display.slice(0, -1) : "0");

  const Btn = ({ label, onClick, cls }) => <button className={"cb " + (cls || "")} onClick={onClick}>{label}</button>;

  return (
    <div className="container calc">
      <div className="screen">{display}</div>
      <div className="grid">
        <Btn label="C" onClick={clear} cls="danger" />
        <Btn label="⌫" onClick={back} />
        <Btn label="÷" onClick={() => operator("÷")} cls="op" />
        <Btn label="×" onClick={() => operator("×")} cls="op" />
        {[7, 8, 9].map((n) => <Btn key={n} label={n} onClick={() => digit(n)} />)}
        <Btn label="-" onClick={() => operator("-")} cls="op" />
        {[4, 5, 6].map((n) => <Btn key={n} label={n} onClick={() => digit(n)} />)}
        <Btn label="+" onClick={() => operator("+")} cls="op" />
        {[1, 2, 3].map((n) => <Btn key={n} label={n} onClick={() => digit(n)} />)}
        <Btn label="=" onClick={equals} cls="eq" />
        <Btn label="0" onClick={() => digit(0)} cls="zero" />
        <Btn label="." onClick={dot} />
      </div>
    </div>
  );
}
