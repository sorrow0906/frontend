import logo from "./logo.svg";
import React from "react";
import "./App.css";
import StoreList from "./components/StoreList";
import StoreDetail from "./components/StoreDetail"
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/store/:sno" element={<StoreDetail />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
