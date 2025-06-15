import React, { useState } from "react";

function PostIdea({ setView }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Image Upload to Cloudinary
  const handleImageUpload = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mindshare_ideas");
    formData.append("cloud_name", "dq8gfcmo0");

    const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // ✅ Return image URL
  };

  // 🚀 Handle Post Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleImageUpload();
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          tags: tags.split(",").map((tag) => tag.trim()),
          image: imageUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Idea posted successfully!");
        setView("dashboard");
      } else {
        alert(data.message || "Failed to post idea.");
      }
    } catch (err) {
      console.error("Error posting idea:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Post a New Idea</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />

        <textarea
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        /><br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Idea"}
        </button>
      </form>
    </div>
  );
}

export default PostIdea;