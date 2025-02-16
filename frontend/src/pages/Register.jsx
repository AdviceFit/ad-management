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

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    number: false,
  });

  const validateEmptyField = (text) => text !== "";

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleFormData = (e) => {
    const { name, value } = e.target;

    if (name === "number" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });

    // Validate based on field
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !emailRegex.test(value),
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: !passwordRegex.test(value),
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValid = validateEmptyField(formData.name);
    const emailValid =
      validateEmptyField(formData.email) && emailRegex.test(formData.email);
    const passwordValid =
      validateEmptyField(formData.password) &&
      passwordRegex.test(formData.password);
    const numberValid = validateEmptyField(formData.number);

    setErrors({
      name: !nameValid,
      email: !emailValid,
      password: !passwordValid,
      number: !numberValid,
    });

    if (nameValid && emailValid && passwordValid && numberValid) {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5000/register",
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
          background: "rgba(0, 0, 0, 0.7)",
          opacity: 0.9,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Ad Management
        </Typography>
      </Box> */}

      {/* Right side (register form) */}
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
            Sign up
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Create your account
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleFormData}
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
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

            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="number"
                label="Phone Number"
                name="number"
                value={formData.number}
                onChange={handleFormData}
                error={errors.number}
                helperText={errors.number ? "Phone number is required" : ""}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: "16px",
                padding: "10px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <Typography variant="body1">Sign Up</Typography>
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
              Already have an account?{" "}
              <Link
                to="/login"
                color="primary"
                style={{
                  color: "#1976d2",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
