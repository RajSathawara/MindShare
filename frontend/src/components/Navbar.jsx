import React from "react";

function Navbar({ setView }) {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>MindShare</h2>
      <div style={styles.links}>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("post")}>Post Idea</button>
        <button onClick={() => setView("profile")}>Profile</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "10px",
  },
};

export default Navbar;