import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./actions.js";
import "./App.css";

export default function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="container center">
      <h1>Counter (Actions + Reducer)</h1>
      <h2 className="big">{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button className="danger" onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
