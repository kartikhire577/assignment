import { useEffect, useRef, useState } from "react";
import "./App.css";

// Counts how many DOM nodes/text changes the browser performs inside a container
function useMutationCount(ref) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver((records) => {
      let n = 0;
      records.forEach((r) => { n += r.type === "childList" ? r.addedNodes.length + r.removedNodes.length : 1; });
      setCount((c) => c + n);
    });
    observer.observe(ref.current, { childList: true, subtree: true, characterData: true, attributes: true });
    return () => observer.disconnect();
  }, [ref]);
  return count;
}

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

// ---------- Traditional DOM: rebuilds the whole HTML string on every update ----------
function TraditionalDom() {
  const boxRef = useRef(null);
  const [n, setN] = useState(0);

  const paint = (value) => {
    boxRef.current.innerHTML =
      `<h3>Count: ${value}</h3><ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  };

  useEffect(() => { paint(n); }, []);          // first paint (before observer starts)
  const changes = useMutationCount(boxRef);

  const click = () => { const v = n + 1; setN(v); paint(v); };   // manual DOM update

  return (
    <div className="panel">
      <h2>Traditional DOM</h2>
      <div ref={boxRef} />
      <button onClick={click}>Increment</button>
      <p className="error">DOM changes: <b>{changes}</b></p>
      <small>innerHTML replaces every element, even the unchanged list.</small>
    </div>
  );
}

// ---------- React: virtual DOM diffing updates only what changed ----------
function ReactRendering() {
  const boxRef = useRef(null);
  const [n, setN] = useState(0);
  const changes = useMutationCount(boxRef);

  return (
    <div className="panel">
      <h2>React (Virtual DOM)</h2>
      <div ref={boxRef}>
        <h3>Count: {n}</h3>
        <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
      </div>
      <button onClick={() => setN(n + 1)}>Increment</button>
      <p className="success">DOM changes: <b>{changes}</b></p>
      <small>React diffs the virtual trees and updates only the changed text node.</small>
    </div>
  );
}

export default function App() {
  return (
    <div className="container wide">
      <h1>Virtual DOM vs Traditional DOM</h1>
      <div className="two">
        <TraditionalDom />
        <ReactRendering />
      </div>
      <p>Click both Increment buttons several times and compare the number of real DOM changes.</p>
    </div>
  );
}
