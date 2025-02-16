import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/MainLayout";
import { PageNotFound } from "./pages/PageNotFound";
import Campaigns from "./pages/Campaigns";
import AddCampaign from "./pages/AddCampaign";
// import Campaigns from "./pages/";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/campaigns"
          element={
            <MainLayout>
              <Campaigns />
            </MainLayout>
          }
        />
        <Route
          path="/campaigns/add"
          element={
            <MainLayout>
              <AddCampaign />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
