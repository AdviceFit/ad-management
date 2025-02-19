import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateCampaign = () => {
    navigate("/campaigns/add");
  };

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/campaigns");

      if (response?.status === 200) {
        setCampaigns(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCampaigns([]);
      }
    } catch (err) {
      setIsLoading(false);
      setCampaigns([]);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

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

      <Box
        sx={{
          height: "calc(100vh - 160px)",
          width: "100%",
          overflow: "auto",
          marginTop: "16px",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <CircularProgress size={40} color="inherit" />
          </Box>
        ) : campaigns?.length > 0 ? (
          <Grid container spacing={3} p={1}>
            {campaigns?.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign._id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    },
                    background:
                      "linear-gradient(285deg,rgb(68, 98, 197),rgb(73, 204, 160))",
                  }}
                >
                  <CardContent>
                    {campaign?.templateUrl && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "auto",
                          marginBottom: 2,
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={campaign?.templateUrl}
                          alt={campaign?.name || "Campaign Image"}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 2,
                        color: "white",
                      }}
                    >
                      {campaign?.name || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{ marginBottom: 1 }}
                    >
                      Goal: {campaign?.goal || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{ marginBottom: 1 }}
                    >
                      Total Budget: ${campaign?.budget?.total || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{ marginBottom: 1 }}
                    >
                      Daily Cap: ${campaign?.budget?.dailyCap || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{ marginBottom: 1 }}
                    >
                      Duration: {campaign?.budget?.duration || "-"} days
                    </Typography>
                    <Typography variant="body2" color="white">
                      Product Name: {campaign?.productDetails?.name || "-"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            color="white"
            sx={{ textAlign: "center", marginTop: 5 }}
          >
            No campaigns found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Campaigns;
