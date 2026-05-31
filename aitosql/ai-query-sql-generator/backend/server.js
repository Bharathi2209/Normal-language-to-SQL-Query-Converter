require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Routes
const queryRoute = require("./routes/query");
const historyRoute = require("./routes/history");

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.send("AI SQL Backend Running");
});

// API Routes
app.use("/api/query", queryRoute);
app.use("/api/history", historyRoute);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);
