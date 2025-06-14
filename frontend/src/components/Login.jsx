import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, userId } = res.data;
      // Save token (for future requests)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Optional: Call parent component to update login state
      onLoginSuccess(); // Can be used to navigate to dashboard or change screen
    } catch (err) {
      console.error(err);
      setError("Login failed. Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Login to MindShare</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;