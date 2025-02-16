require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const campaignRoutes = require("./routes/campaignRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/users", userRoutes);
app.use("/api", campaignRoutes);

// Error Handling Middleware
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
