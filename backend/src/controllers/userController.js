const UserService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    // Validate all fields
    if (!name || !email || !password || !number) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered with us." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the additional fields
    const newUser = await UserService.createUser({
      name,
      email,
      password: hashedPassword,
      number,
    });

    // Respond with the created user details (excluding the password)
    const userWithoutPassword = { ...newUser._doc };
    delete userWithoutPassword.password;

    res.status(201).json({
      message: "User registered successfully.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Signup error: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000, // 24 hours in milliseconds
      sameSite: "lax",
      path: "/", // Ensure the path is set correctly
    });
    res.status(200).json({ message: "Login successfully.", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
