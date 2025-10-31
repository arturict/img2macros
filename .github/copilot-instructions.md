# Copilot Instructions for Img2Macros

## Project Overview

Img2Macros is a web application that analyzes food images to estimate nutritional information using AI. The application consists of a Node.js/Express backend API that integrates with Google's Gemini 2.0 Flash model and a vanilla JavaScript frontend for image upload and results display.

## Architecture

### Backend (API)
- **Framework**: Express.js
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)
- **Location**: `/api` directory
- **Entry Point**: `api/app.js`
- **Port**: Default 3000 (configurable via environment variable)

### Frontend
- **Technology**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Main Files**: 
  - `index.html` - UI structure
  - `script.js` - Image handling and API communication
  - `styles.css` - Styling

### Key Features
- Image upload with automatic resize (max 800x800px)
- JPEG compression (80% quality)
- Base64 image encoding for API transmission
- Real-time nutritional analysis using AI

## Technology Stack

- **Runtime**: Node.js (v14 or newer)
- **Backend Dependencies**:
  - `express` - Web framework
  - `cors` - CORS middleware
  - `@google/generative-ai` - Google Gemini AI SDK
  - `dotenv` - Environment variable management
- **Development**: `nodemon` for hot-reloading

## Code Style and Conventions

### JavaScript
- Use `const` and `let` instead of `var`
- Use async/await for asynchronous operations
- Include error handling with try-catch blocks
- Use meaningful variable and function names

### API Endpoints
- RESTful design patterns
- JSON request/response format
- Proper HTTP status codes
- Error messages in `{ error: "message" }` format

### Code Organization
- Backend code in `/api` directory
- Frontend files in root directory
- Keep concerns separated (routing, AI logic, validation)

## Development Workflow

### Setup
1. Install backend dependencies: `cd api && npm install`
2. Create `.env` file in `/api` with required environment variables
3. Start the server: `npm start` or `npm run dev` (for development with nodemon)

### Environment Variables
Required in `/api/.env`:
- `GOOGLE_API_KEY` - Google Generative AI API key
- `PORT` - Server port (optional, defaults to 3000)

### Running the Application
- Backend: `cd api && npm start`
- Frontend: Open `index.html` in browser or serve with a simple HTTP server

## Testing

Currently, the project uses the placeholder test command `echo "Error: no test specified" && exit 1` in `package.json`. When implementing tests:
- Add unit tests for API endpoints
- Add integration tests for AI model interactions
- Test image processing and validation logic
- Mock external API calls in tests

## API Documentation

### POST /process-image
Analyzes food images and returns nutritional estimates.
- **Request**: `{ image: "base64_data", prompt: "analysis_prompt" }`
- **Response**: `{ generated: "nutritional_text" }`
- **Payload Limit**: 50MB

### POST /generate
Generates text responses without images.
- **Request**: `{ prompt: "text_prompt" }`
- **Response**: `{ generated: "response_text" }`

### GET /health
Health check endpoint.
- **Response**: `{ status: "ok" }`

## Security Considerations

### Critical Security Rules
- **Never commit** `.env` files or API keys to version control
- The `.env` file is already in `.gitignore` - keep it there
- In production, restrict CORS to specific origins (currently allows all)
- Validate and sanitize all user inputs
- Implement rate limiting for API endpoints in production
- Use HTTPS in production environments

### Image Handling Security
- Validate file types on both frontend and backend
- Enforce size limits to prevent DoS attacks
- Current limit: 50MB JSON payload (includes base64-encoded images)
- Frontend pre-processes images to max 800x800px

## Best Practices for Code Changes

### When Adding Features
- Maintain the existing architecture pattern
- Keep frontend and backend concerns separated
- Update README.md with new features or setup steps
- Consider image size and performance implications
- Test with various image formats and sizes

### When Modifying AI Integration
- The model is configured as "gemini-2.0-flash"
- Image data must be in `inlineData` format with base64 data and mimeType
- Test prompts thoroughly to ensure quality responses
- Handle API errors gracefully with user-friendly messages

### When Updating Dependencies
- Test thoroughly after updates, especially AI SDK updates
- Check for breaking changes in release notes
- Update package-lock.json

## Common Pitfalls to Avoid

1. **Large Images**: The application resizes images, but ensure this logic remains intact
2. **CORS Issues**: Keep CORS enabled for development; configure properly for production
3. **API Key Exposure**: Double-check that API keys are never logged or exposed in responses
4. **Base64 Encoding**: Remember to strip the data URL prefix before sending to backend
5. **Error Handling**: Always provide user-friendly error messages in the UI

## Deployment Notes

- Frontend can be served as static files from any web server
- Backend requires Node.js runtime environment
- Set environment variables in production environment (not in code)
- Configure CORS for your production domain
- Consider implementing request rate limiting
- Monitor API usage and costs for Google Generative AI

## File Structure Reference

```
img2macros/
├── .github/
│   └── copilot-instructions.md  # This file
├── api/
│   ├── app.js                   # Express server and routes
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables (gitignored)
├── index.html                   # Frontend entry point
├── script.js                    # Frontend JavaScript logic
├── styles.css                   # Frontend styling
├── .gitignore                   # Git ignore rules
└── README.md                    # User documentation
```

## Additional Resources

- Google Generative AI Documentation: https://ai.google.dev/
- Express.js Documentation: https://expressjs.com/
- Project README: See `/README.md` for setup instructions and API documentation
