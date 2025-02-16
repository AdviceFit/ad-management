import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validateEmptyField = (text) => text !== "";

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value.trim() === "",
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.trim() === "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordValid = validateEmptyField(formData.password);
    const emailValid = validateEmptyField(formData.email);
    setErrors({
      email: !emailValid,
      password: !passwordValid,
    });
    if (emailValid && passwordValid) {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );

      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard");
      }
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to right, #4CAF50,  #10B981)",
      }}
    >
      {/* Left side (background) */}
      {/* <Box
        sx={{
          flex: 1,
          // backgroundImage: "url('https://api.unsplash.com/users/lukeskywalker')",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // background: "linear-gradient(to right, #1E40AF, #1E40AF)",
          background:'rgba(0, 0, 0, 0.7)',
          opacity: 0.9,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Ad Management
        </Typography>
      </Box> */}

      {/* Right side (login form) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Sign in
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Login to your account
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                autoFocus
                onChange={handleFormData}
                error={errors.email}
                helperText={errors.email ? "Email is required" : ""}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleFormData}
                error={errors.password}
                helperText={errors.password ? "Password is required" : ""}
                autoComplete="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Typography>👁️</Typography>
                        ) : (
                          <Typography>🙈</Typography>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Box sx={{ textAlign: "right", marginBottom: 2 }}>
              <Typography variant="subtitle1">
                <Link
                  to="/resetpassword"
                  style={{ color: "rgba(1, 1, 1, 0.5)" }}
                >
                  Forgot password?
                </Link>
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "10px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <Typography variant="body1">Login</Typography>
              )}
            </Button>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "400",
                textAlign: "center",
                color: "rgba(1, 1, 1, 0.5)",
                marginTop: 2,
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                color="primary"
                style={{
                  color: "#1976d2",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
