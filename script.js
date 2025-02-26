// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const submitBtn = document.getElementById('submitBtn');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const imagePreview = document.getElementById('imagePreview');

    // API endpoint (adjust if your API is hosted elsewhere)
    const API_URL = 'http://localhost:3000/process-image';

    // Add preview functionality
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.classList.add('hidden');
        }
    });

    // Function to handle image submission
    submitBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        
        if (!file) {
            alert('Please select an image file');
            return;
        }
        
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }
        
        try {
            // Show loading indicator
            loadingDiv.classList.remove('hidden');
            resultsDiv.classList.add('hidden');
            
            // Process image (resize if needed) and convert to base64
            const base64Image = await processAndConvertImage(file);
            
            // Send image to API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image.split(',')[1], // Remove data URL prefix
                    prompt: "Analyze this food image and provide nutritional information. Return the results in this format:\nFood: [food name]\nCalories: [amount] kcal\nProtein: [amount]g\nCarbs: [amount]g\nFat: [amount]g\n\nProvide your best estimate based on the visible ingredients and portion size."
                }),
            });
            
            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Display the results
            displayResults(data.generated);
            
        } catch (error) {
            console.error('Error processing image:', error);
            alert('Error processing image. Please try again.');
        } finally {
            // Hide loading indicator
            loadingDiv.classList.add('hidden');
        }
    });

    // Function to process and resize image if needed
    function processAndConvertImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Target max dimensions (adjust as needed)
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    
                    let width = img.width;
                    let height = img.height;
                    
                    // Resize if image is too large
                    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                        if (width > height) {
                            height = Math.round(height * (MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        } else {
                            width = Math.round(width * (MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }
                    
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to JPEG format with reduced quality to minimize size
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(dataUrl);
                };
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Function to display macros and calories
    function displayResults(text) {
        // Show results div
        resultsDiv.classList.remove('hidden');
        
        // Parse the API response - this is simplified and assumes a specific format
        // In a real app, you might want to parse this more robustly
        let formattedHtml = '<h2>Analysis Results</h2><div class="macro-info">';
        
        // Split by new lines and convert to HTML
        const lines = text.split('\n');
        lines.forEach(line => {
            if (line.trim()) {
                const [key, value] = line.split(':');
                if (key && value) {
                    formattedHtml += `<p><strong>${key.trim()}:</strong> ${value.trim()}</p>`;
                } else {
                    formattedHtml += `<p>${line}</p>`;
                }
            }
        });
        
        formattedHtml += '</div>';
        
        resultsDiv.innerHTML = formattedHtml;
    }
});