// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const submitBtn = document.getElementById('submitBtn');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');

    // API endpoint (adjust if your API is hosted elsewhere)
    const API_URL = 'http://localhost:3000/process-image';

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
            
            // Convert image to base64
            const base64Image = await convertToBase64(file);
            
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

    // Function to convert image to base64
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
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