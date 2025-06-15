import React, { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Get user info
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to load user", err));

    // ✅ Get all ideas
    fetch("http://localhost:5000/api/ideas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setIdeas(data))
      .catch((err) => console.error("Failed to load ideas", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome {user?.username || "Guest"} 👋</h2>
      <p>Explore what others are thinking...</p>

      <h3 style={{ marginTop: "2rem" }}>Latest Ideas</h3>
      <div>
        {ideas.length === 0 ? (
          <p>No ideas found yet.</p>
        ) : (
          ideas.map((idea, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h4>{idea.title}</h4>
              <p>{idea.description}</p>
              {idea.image && (
                <img src={idea.image} alt="Idea" style={{ maxWidth: "200px", maxHeight: "150px" }} />
              )}
              <p>
                <strong>Tags:</strong> {idea.tags?.join(", ")}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#555" }}>
                Posted by {idea.createdBy?.username || "Unknown"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
