import React from "react";
import { List, ListItem, ListItemText, Box, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/GridView";
import CampaignIcon from "@mui/icons-material/Campaign";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        width: 240,
        height: "calc(100vh - 64px)",
        top: 0,
        left: 0,
        bgcolor: "background.paper",
        borderRight: "1px solid #ddd",
      }}
    >
      <List>
        <ListItem
          button
          onClick={() => {
            navigate("/dashboard");
          }}
          sx={{
            cursor: "pointer",
            backgroundColor: isActive("/dashboard") ? "#f0f0f0" : "transparent",
            "&:hover": {
              backgroundColor: isActive("/dashboard") ? "#e0e0e0" : "#f5f5f5",
            },
          }}
        >
          <DashboardIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            navigate("/campaigns");
          }}
          sx={{
            cursor: "pointer",
            backgroundColor: isActive("/campaigns") ? "#f0f0f0" : "transparent",
            "&:hover": {
              backgroundColor: isActive("/campaigns") ? "#e0e0e0" : "#f5f5f5",
            },
          }}
        >
          <CampaignIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Campaigns" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
