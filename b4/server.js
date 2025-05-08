require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');
// The user's script used: import { GoogleGenAI } from "@google/genai";
// So we use the same import style for require:
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

// IMPORTANT: Your Gemini API Key is now loaded from the .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(path.join(__dirname)));
// Serve static files from the 'images' directory, accessible via /images URL path
app.use('/images', express.static(path.join(__dirname, 'images')));


// API endpoint for image generation
app.post('/api/generate-image', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    if (!GEMINI_API_KEY) { // Check if the key was loaded
        console.error("Gemini API Key not found in .env file or environment variables.");
        return res.status(500).json({ success: false, error: 'API Key not configured on server. Please contact the administrator.' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        
        // Using the model and config from the user's example script
        const modelName = 'imagen-3.0-generate-002'; 
        // You might need to verify this model name or use one you have access to.

        console.log(`Generating image for prompt: "${prompt}" with model: ${modelName}`);

        const response = await ai.models.generateImages({
            model: modelName,
            prompt: prompt,
            config: {
              numberOfImages: 1, // Generate one image for simplicity
            },
        });

        if (response && response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image) {
            const imageBase64 = response.generatedImages[0].image.imageBytes; // This is the base64 string
            res.json({ success: true, imageBase64: imageBase64, prompt: prompt });
        } else {
            console.error('No image generated or unexpected response structure:', response);
            res.status(500).json({ success: false, error: 'Failed to generate image or empty/unexpected response from API' });
        }
    } catch (error) {
        console.error('Error generating image with Gemini:', error.message);
        let clientErrorMessage = 'Failed to generate image due to an internal server error.';
        if (error.message && error.message.toLowerCase().includes("api key not valid")) {
             clientErrorMessage = "Failed to generate image: Invalid API Key. Please check server configuration.";
        } else if (error.message && error.message.toLowerCase().includes("quota")) {
            clientErrorMessage = "Failed to generate image: API quota exceeded. Please try again later.";
        } else if (error.message && error.message.toLowerCase().includes("model not found")) {
            clientErrorMessage = `Failed to generate image: Model '${modelName}' not found or not accessible.`;
        }
        // Check for specific error structures if the SDK provides them
        // e.g., if (error.response && error.response.data ...)
        res.status(500).json({ success: false, error: clientErrorMessage, details: error.message });
    }
});

// Fallback to serve index.html for any other GET request not handled by static middleware
app.get('*', (req, res) => {
    // Ensure it's not an API call or a file extension common for assets
    if (!req.path.startsWith('/api/') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    if (!GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY is not set. Make sure you have a .env file with GEMINI_API_KEY=your_key and run 'npm install'.");
    } else {
        console.log("GEMINI_API_KEY loaded successfully from .env file (first few chars):", GEMINI_API_KEY.substring(0, 5) + "...");
    }
    console.log("Open your terminal in this project directory and run:");
    console.log("1. Create a .env file with your GEMINI_API_KEY (if you haven't already)");
    console.log("   Example .env file content: GEMINI_API_KEY=your_actual_api_key_here");
    console.log("2. npm install (to install dotenv and other dependencies)");
    console.log("3. npm start");
    console.log("Then open http://localhost:3000 in your browser.");
}); 