// backend/server.js

// Load environment variables from .env file
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const path = require("path");
const { GoogleGenAI } = require("@google/genai");


// Import modular components
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');

// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (using the imported function)
connectDB();

// --- Middleware Setup ---

// 1. CORS for cross-origin requests
// Allow all origins for development simplicity, or configure specific origins in production
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 2. Body Parser (Express built-in) for JSON
app.use(express.json());

// 3. Simple logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/reports", express.static(path.join(__dirname, "public/reports")));

// --- Routes ---

// Default health check route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Multi-Agent Backend API is running' });
});


app.get("/api/models", async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Fetch available models
    const models = await ai.models.list();

    // Extract just the model names for readability
    

    res.json({ availableModels: models });
  } catch (err) {
    console.error("Error listing models:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Mount chat routes under the /api path
app.use('/api', chatRoutes); 

// --- Error Handling Middleware ---

// This should be the last middleware mounted
// It catches errors passed via next(error) from controllers/routes
app.use(errorHandler);


// --- Start Server ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));