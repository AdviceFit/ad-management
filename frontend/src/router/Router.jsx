import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import AddCampaign from "../pages/AddCampaign";
import Campaigns from "../pages/Campaigns";
import Dashboard from "../pages/Dashboard";
import HomepageRoute from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PageNotFound } from "../pages/PageNotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route path="/" element={<HomepageRoute />} />
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
    </BrowserRouter>
  );
};

export default Router;
