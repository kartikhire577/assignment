import { useState } from "react";
import "./App.css";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="container center">
      <h1>Sign In / Sign Out</h1>
      <h2 className={signedIn ? "success" : "error"}>
        {signedIn ? "Hello, Welcome in Home Page" : "Please sign in first"}
      </h2>
      <button onClick={() => setSignedIn(true)} disabled={signedIn}>Sign In</button>
      <button className="danger" onClick={() => setSignedIn(false)} disabled={!signedIn}>Sign Out</button>
    </div>
  );
}
