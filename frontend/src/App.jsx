import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PostIdea from "./components/PostIdea";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  // ✅ Handle view switching based on token + login time
  const [view, setView] = useState(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");

    if (token && loginTime) {
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

      // ⏳ If within 24 hours → stay logged in
      if (now - loginTime < oneDay) {
        return "dashboard";
      } else {
        // ❌ More than 1 day passed → logout
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        return "login";
      }
    }

    return "signup";
  });

  // ✅ Control which component to show
  const renderComponent = () => {
    if (view === "login") return <Login setView={setView} />;
    if (view === "signup") return <Signup setView={setView} />;
    if (view === "dashboard") return <Dashboard setView={setView} />;
    if (view === "post") return <PostIdea setView={setView} />;
    if (view === "profile") return <Profile setView={setView} />;
    return null;
  };

  return (
    <div>
      {/* ✅ Show navbar only after login/signup */}
      {view !== "signup" && view !== "login" && <Navbar setView={setView} />}
      {renderComponent()}
    </div>
  );
}

export default App;