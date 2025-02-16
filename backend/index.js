// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/campaigns", require("./routes/campaign"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
