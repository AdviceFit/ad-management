import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HomepageRoute = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #1E40AF, #10B981)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 32,
          display: "flex",
          gap: 2,
        }}
      >
        <Link to='/login'>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: "white",
              color: "white",
              textTransform: 'none',
              "&:hover": {
                borderColor: "rgba(255,255,255,0.6)",
                color: "rgba(255,255,255,0.6)",
              },
            }}
          >
            Sign in
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: "white",
              color: "white",
              textTransform: 'none',
              "&:hover": {
                borderColor: "rgba(255,255,255,0.6)",
                color: "rgba(255,255,255,0.6)",
              },
            }}
          >
            Sign up
          </Button>
        </Link>
      </Box>

      <Typography
        variant="h2"
        sx={{
          color: "white",
        }}
      >
        Welcome to Ad Management
      </Typography>
      <Typography variant="h6"
      >
        Manage your ads efficiently and optimize your campaigns with ease.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ marginRight: 2, color: "rgba(177,177,177,1)" }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "rgb(29, 49, 58)" }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default HomepageRoute;
