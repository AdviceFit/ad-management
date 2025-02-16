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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "../components/Toast";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        data
      );

      if (response?.status === 200) {
        Toast({ message: response?.data?.message, variant: "success" });
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        Toast({ message: error?.response?.data?.message, variant: "error" });
      }
    } finally {
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

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                autoFocus
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                placeholder="john.doe@email.com"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="password"
                placeholder="Example@123"
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
                <CircularProgress size={20} color="inherit" />
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
