import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImageSelector from "./ImageSelector";

const Campaigns = () => {
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate("/campaigns/add");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">Campaigns</Typography>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            padding: "8px",
            textTransform: "none",
          }}
          onClick={handleCreateCampaign}
        >
          <Typography variant="body1" color="rgb(88, 145, 243)">
            Create Campaign
          </Typography>
        </Button>
      </Box>

      <ImageSelector />
    </Box>
  );
};

export default Campaigns;
