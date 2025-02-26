const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google AI with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Configure the model (Gemini 2.0 Flash)
const model = genAI.getGenerativeModel({ model: "gemini-flash-2.0" });

// Routes
app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Generate content with Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ generated: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

// Image processing endpoint
app.post('/process-image', async (req, res) => {
    try {
        const { image, prompt } = req.body;
        
        if (!image || !prompt) {
            return res.status(400).json({ error: 'Image data and prompt are required' });
        }

        // For image input, we need to decode base64 and pass as part of content
        const imageData = {
            inlineData: {
                data: image,
                mimeType: 'image/jpeg', // Adjust based on your input
            },
        };

        // Create content parts with both image and text
        const result = await model.generateContent([imageData, prompt]);
        const response = await result.response;
        const text = response.text();
        
        res.json({ generated: text });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;