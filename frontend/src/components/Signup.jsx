import React, { useState } from "react";
import axios from "axios";

function Signup({ setView }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log("Signup success:", res.data);

      // Navigate to login screen
      onSignupSuccess(); // 👈 Triggers screen change
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
    }
  };

  return (
    <div>
  <h2>Signup</h2>
  <form onSubmit={handleSignup}>
    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button type="submit">Signup</button>
  </form>

  <p>
  Already have an account?{" "}
  <span onClick={() => setView("login")} style={{ color: "blue", cursor: "pointer" }}>
    Login
  </span>
</p>
    </div>

    
  );
}

export default Signup;