import logo from "./logo.svg";
import React from "react";
import "./App.css";
import StoreList from "./components/StoreList";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/a" element={<></>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
