import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice.js";
import "./App.css";

export default function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // Display the count on the console whenever it changes
  useEffect(() => {
    console.log("Current count:", count);
  }, [count]);

  return (
    <div className="container center">
      <h1>Redux Counter</h1>
      <h2 className="big">{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button className="danger" onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
