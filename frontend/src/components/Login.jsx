import React, { useState } from "react";

function Login({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        // ✅ Store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginTime", new Date().getTime()); // ✅ store login timestamp
setView("dashboard");

        // ✅ Navigate to dashboard
        setView("dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Try again.");
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

      <p>
        Don't have an account?{" "}
        <button onClick={() => setView("signup")}>Signup here</button>
      </p>
    </div>
  );
}

export default Login;