# Img2Macros

Img2Macros is an application that analyzes food images to estimate nutritional information using AI. Upload a photo of your meal and get an estimate of calories, protein, carbs, and fat content.

## Project Structure

```
img2macros/
├── api/               # Backend API
│   ├── app.js         # Express server
│   ├── package.json   # API dependencies
│   └── .env           # Environment variables (not committed)
├── index.html         # Frontend entry point
├── script.js          # Frontend JavaScript
├── styles.css         # Frontend styling
└── README.md          # This file
```

## Prerequisites

- Node.js (v14 or newer)
- Google Generative AI API key (for Gemini model)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the API directory:
   ```
   cd api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `api` directory:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   PORT=3000
   ```

4. Install required package:
   ```
   npm install @google/generative-ai dotenv
   ```

5. Start the server:
   ```
   node app.js
   ```
   The API server should now be running at http://localhost:3000.

### 2. Frontend Setup

1. Simply open `index.html` in your browser, or serve it using a simple HTTP server.

## Usage

1. Open the application in your browser
2. Click "Choose File" to upload a food image
3. Click "Analyze Food" to send the image for processing
4. View the estimated nutritional information for your meal

## API Endpoints

### Process Image

**POST** `/process-image`

Analyzes a food image and returns nutritional information.

**Request Body:**
```json
{
  "image": "base64_encoded_image_data",
  "prompt": "Analyze this food image and provide nutritional information including calories, protein, carbs, and fat content."
}
```

**Response:**
```json
{
  "generated": "Food: Chicken Caesar Salad\nCalories: ~350 kcal\nProtein: 28g\nCarbs: 12g\nFat: 22g\n..."
}
```

### Generate Content (Text Only)

**POST** `/generate`

Generates text responses using the Gemini model.

**Request Body:**
```json
{
  "prompt": "Your prompt here"
}
```

**Response:**
```json
{
  "generated": "Generated text response"
}
```

### Health Check

**GET** `/health`

Returns the API status.

**Response:**
```json
{
  "status": "ok"
}
```

## Getting a Google Generative AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Navigate to "API Keys" or "Get API Key"
4. Create a new API key
5. Copy the key and paste it into your `.env` file

## Security Notes

- Never commit your `.env` file or expose your API keys
- The application uses CORS to allow requests from any origin in development; restrict this in production
- Base64 image encoding/decoding increases payload size; consider optimizations for production

## License

This project is licensed under the MIT License.
