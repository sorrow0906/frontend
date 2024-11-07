import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StoreList from "./components/StoreList";
import StoreDetail from "./components/StoreDetail";
import Login from "./components/Login";
import Layout from "./components/Layout";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  return (
    <div className="App">
      <Layout loggedIn={loggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/store/:sno" element={<StoreDetail />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;