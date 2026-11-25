import { useState } from "react";
import "./App.css";

function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);   // state manages the number
  return (
    <div className="container center">
      <h1 className="big">{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button className="danger" onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default function App() {
  return <Counter initial={0} />;   // initial number passed as a prop
}
