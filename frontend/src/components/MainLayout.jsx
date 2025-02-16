import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Sidebar from "./SIdebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{ display: "flex", height: "calc(100vh - 64px)", width: "100vw" }}
      >
        <Sidebar />
        <Box sx={{ width: 'calc(100vw - 240px)', padding: '20px'}}>
        {children}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
