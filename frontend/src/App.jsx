import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <h1>MindShare</h1>

      {showLogin ? (
        <>
          <Login onLoginSuccess={() => alert("Login successful!")} />
          <p>Don’t have an account? <button onClick={() => setShowLogin(false)}>Signup</button></p>
        </>
      ) : (
        <>
          <Signup onSignupSuccess={() => setShowLogin(true)} />
          <p>Already have an account? <button onClick={() => setShowLogin(true)}>Login</button></p>
        </>
      )}
    </div>
  );
}

export default App;