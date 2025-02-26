// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const submitBtn = document.getElementById('submitBtn');

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
            // Here you would typically send the image to a server/API
            // For now, we'll just display a placeholder response
            displayResults();
        } catch (error) {
            console.error('Error processing image:', error);
            alert('Error processing image. Please try again.');
        }
    });

    // Function to display macros and calories (placeholder)
    function displayResults() {
        // Create a results div if it doesn't exist
        let resultsDiv = document.querySelector('.results');
        if (!resultsDiv) {
            resultsDiv = document.createElement('div');
            resultsDiv.className = 'results';
            document.body.appendChild(resultsDiv);
        }

        // Display placeholder data
        resultsDiv.innerHTML = `
            <h2>Analysis Results</h2>
            <div class="macro-info">
                <p><strong>Food:</strong> Mixed Salad with Chicken</p>
                <p><strong>Calories:</strong> 350 kcal</p>
                <p><strong>Protein:</strong> 25g</p>
                <p><strong>Carbs:</strong> 30g</p>
                <p><strong>Fat:</strong> 15g</p>
                <p><em>Note: This is placeholder data. In a real application, this would be generated from image analysis.</em></p>
            </div>
        `;
    }
});