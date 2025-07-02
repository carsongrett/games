// Weather Challenge Game
let weatherGame = {
    score: 0,
    round: 1,
    totalRounds: 5,
    currentCity: null,
    currentTemperature: null,
    gameActive: false,
    usedCities: [],
    availableCities: [],
    apiKey: '1c32d455e349d8ef7d0e79c52d1bb89d'
};

// List of cities with coordinates for diverse weather conditions
const cities = [
    { name: 'New York, NY', lat: 40.7128, lon: -74.0060, country: 'US' },
    { name: 'Los Angeles, CA', lat: 34.0522, lon: -118.2437, country: 'US' },
    { name: 'Chicago, IL', lat: 41.8781, lon: -87.6298, country: 'US' },
    { name: 'Miami, FL', lat: 25.7617, lon: -80.1918, country: 'US' },
    { name: 'Seattle, WA', lat: 47.6062, lon: -122.3321, country: 'US' },
    { name: 'Phoenix, AZ', lat: 33.4484, lon: -112.0740, country: 'US' },
    { name: 'Denver, CO', lat: 39.7392, lon: -104.9903, country: 'US' },
    { name: 'Boston, MA', lat: 42.3601, lon: -71.0589, country: 'US' },
    { name: 'Las Vegas, NV', lat: 36.1699, lon: -115.1398, country: 'US' },
    { name: 'San Francisco, CA', lat: 37.7749, lon: -122.4194, country: 'US' },
    { name: 'London, UK', lat: 51.5074, lon: -0.1278, country: 'GB' },
    { name: 'Paris, France', lat: 48.8566, lon: 2.3522, country: 'FR' },
    { name: 'Berlin, Germany', lat: 52.5200, lon: 13.4050, country: 'DE' },
    { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964, country: 'IT' },
    { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038, country: 'ES' },
    { name: 'Amsterdam, Netherlands', lat: 52.3676, lon: 4.9041, country: 'NL' },
    { name: 'Stockholm, Sweden', lat: 59.3293, lon: 18.0686, country: 'SE' },
    { name: 'Oslo, Norway', lat: 59.9139, lon: 10.7522, country: 'NO' },
    { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, country: 'JP' },
    { name: 'Seoul, South Korea', lat: 37.5665, lon: 126.9780, country: 'KR' },
    { name: 'Beijing, China', lat: 39.9042, lon: 116.4074, country: 'CN' },
    { name: 'Shanghai, China', lat: 31.2304, lon: 121.4737, country: 'CN' },
    { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, country: 'HK' },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, country: 'SG' },
    { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093, country: 'AU' },
    { name: 'Melbourne, Australia', lat: -37.8136, lon: 144.9631, country: 'AU' },
    { name: 'Auckland, New Zealand', lat: -36.8485, lon: 174.7633, country: 'NZ' },
    { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357, country: 'EG' },
    { name: 'Lagos, Nigeria', lat: 6.5244, lon: 3.3792, country: 'NG' },
    { name: 'Johannesburg, South Africa', lat: -26.2041, lon: 28.0473, country: 'ZA' },
    { name: 'Cape Town, South Africa', lat: -33.9249, lon: 18.4241, country: 'ZA' },
    { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6176, country: 'RU' },
    { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777, country: 'IN' },
    { name: 'Delhi, India', lat: 28.7041, lon: 77.1025, country: 'IN' },
    { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018, country: 'TH' },
    { name: 'Jakarta, Indonesia', lat: -6.2088, lon: 106.8456, country: 'ID' },
    { name: 'Manila, Philippines', lat: 14.5995, lon: 120.9842, country: 'PH' },
    { name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333, country: 'BR' },
    { name: 'Rio de Janeiro, Brazil', lat: -22.9068, lon: -43.1729, country: 'BR' },
    { name: 'Buenos Aires, Argentina', lat: -34.6037, lon: -58.3816, country: 'AR' },
    { name: 'Lima, Peru', lat: -12.0464, lon: -77.0428, country: 'PE' },
    { name: 'Mexico City, Mexico', lat: 19.4326, lon: -99.1332, country: 'MX' },
    { name: 'Toronto, Canada', lat: 43.6532, lon: -79.3832, country: 'CA' },
    { name: 'Vancouver, Canada', lat: 49.2827, lon: -123.1207, country: 'CA' },
    { name: 'Montreal, Canada', lat: 45.5017, lon: -73.5673, country: 'CA' },
    { name: 'Reykjavik, Iceland', lat: 64.1466, lon: -21.9426, country: 'IS' },
    { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, country: 'AE' },
    { name: 'Istanbul, Turkey', lat: 41.0082, lon: 28.9784, country: 'TR' },
    { name: 'Tel Aviv, Israel', lat: 32.0853, lon: 34.7818, country: 'IL' },
    { name: 'Nairobi, Kenya', lat: -1.2921, lon: 36.8219, country: 'KE' }
];

// Test API key function
async function testApiKey() {
    try {
        console.log('Testing API key...');
        const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherGame.apiKey}&units=imperial`;
        console.log('Test URL:', testUrl);
        
        const response = await fetch(testUrl);
        console.log('Test response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('API key test successful:', data);
            return true;
        } else {
            const errorText = await response.text();
            console.log('API key test failed:', response.status, errorText);
            return false;
        }
    } catch (error) {
        console.log('API key test error:', error);
        return false;
    }
}

// Initialize game when section is opened (without starting)
function initializeWeatherChallenge() {
    // Only initialize if not already initialized
    if (!weatherGame.gameActive && weatherGame.round === 1 && weatherGame.score === 0) {
        // Start the first game automatically
        newWeatherGame();
    }
}

// Initialize game
function newWeatherGame() {
    weatherGame.score = 0;
    weatherGame.round = 1;
    weatherGame.gameActive = true;
    weatherGame.usedCities = [];
    weatherGame.availableCities = [...cities]; // Create a copy of all cities
    
    updateWeatherDisplay();
    document.getElementById('weather-message').style.display = 'none';
    document.getElementById('weather-result').style.display = 'none';
    document.getElementById('temperature-guess').value = '';
    document.getElementById('temperature-guess').disabled = false;
    document.getElementById('submit-weather-btn').disabled = false;
    
    // Test API key first
    testApiKey().then(success => {
        if (success) {
            loadNextCity();
        } else {
            document.getElementById('weather-city').textContent = 'API Key Error';
            document.getElementById('weather-message').textContent = 'There seems to be an issue with the weather API. Please check the console for details.';
            document.getElementById('weather-message').style.display = 'block';
        }
    });
}

// Load weather data for a random city
async function loadNextCity() {
    try {
        // Select random city from available cities (ensuring no repeats)
        if (weatherGame.availableCities.length === 0) {
            // If we've used all cities, reset the available cities
            weatherGame.availableCities = [...cities];
            weatherGame.usedCities = [];
        }
        
        const randomIndex = Math.floor(Math.random() * weatherGame.availableCities.length);
        weatherGame.currentCity = weatherGame.availableCities[randomIndex];
        
        // Move city from available to used
        weatherGame.usedCities.push(weatherGame.currentCity);
        weatherGame.availableCities.splice(randomIndex, 1);
        
        // Show loading state
        document.getElementById('weather-city').textContent = 'Loading weather data...';
        document.getElementById('weather-icon').style.display = 'none';
        document.getElementById('weather-description').textContent = '';
        
        // Try API call with coordinates first
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherGame.currentCity.lat}&lon=${weatherGame.currentCity.lon}&appid=${weatherGame.apiKey}&units=imperial`;
        console.log('Primary API URL:', apiUrl);
        
        let response = await fetch(apiUrl);
        
        // If coordinates fail, try with city name as backup
        if (!response.ok) {
            console.log('Coordinates failed, trying city name...');
            const cityName = weatherGame.currentCity.name.split(',')[0]; // Get just the city name
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${weatherGame.apiKey}&units=imperial`;
            console.log('Backup API URL:', apiUrl);
            response = await fetch(apiUrl);
        }
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            throw new Error(`Weather API error: ${response.status} - ${errorText}`);
        }
        
        const weatherData = await response.json();
        console.log('Weather data:', weatherData);
        
        // Store current temperature
        weatherGame.currentTemperature = Math.round(weatherData.main.temp);
        
        // Update display
        document.getElementById('weather-city').textContent = weatherGame.currentCity.name;
        document.getElementById('weather-description').textContent = weatherData.weather[0].description;
        
        // Set weather icon
        const iconCode = weatherData.weather[0].icon;
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = weatherData.weather[0].description;
        weatherIcon.style.display = 'block';
        
        // Clear previous result
        document.getElementById('weather-result').style.display = 'none';
        document.getElementById('temperature-guess').focus();
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        document.getElementById('weather-city').textContent = 'Error loading weather data';
        document.getElementById('weather-message').textContent = 'Unable to load weather data. Please try again.';
        document.getElementById('weather-message').style.display = 'block';
    }
}

// Submit temperature guess
function submitTemperatureGuess() {
    const guess = parseInt(document.getElementById('temperature-guess').value);
    
    if (isNaN(guess)) {
        alert('Please enter a valid temperature number');
        return;
    }
    
    if (!weatherGame.gameActive) {
        return;
    }
    
    // Calculate difference and points
    const actualTemp = weatherGame.currentTemperature;
    const difference = Math.abs(guess - actualTemp);
    let points = 0;
    
    // Scoring system
    if (difference === 0) {
        points = 10;
    } else if (difference <= 2) {
        points = 8;
    } else if (difference <= 5) {
        points = 5;
    } else if (difference <= 10) {
        points = 3;
    } else if (difference <= 15) {
        points = 1;
    }
    
    weatherGame.score += points;
    
    // Show result
    const resultDiv = document.getElementById('weather-result');
    document.getElementById('actual-temperature').textContent = `Actual temperature: ${actualTemp}°F`;
    document.getElementById('temperature-difference').textContent = `Your guess: ${guess}°F (${difference === 0 ? 'Perfect!' : `off by ${difference}°F`})`;
    document.getElementById('points-earned').textContent = `Points earned: ${points}`;
    
    resultDiv.style.display = 'block';
    
    // Disable input
    document.getElementById('temperature-guess').disabled = true;
    document.getElementById('submit-weather-btn').disabled = true;
    
    // Show next button or end game
    if (weatherGame.round < weatherGame.totalRounds) {
        document.getElementById('next-city-btn').style.display = 'inline-block';
    } else {
        endWeatherGame();
    }
    
    updateWeatherDisplay();
}

// Move to next round
function nextWeatherRound() {
    weatherGame.round++;
    document.getElementById('temperature-guess').value = '';
    document.getElementById('temperature-guess').disabled = false;
    document.getElementById('submit-weather-btn').disabled = false;
    document.getElementById('next-city-btn').style.display = 'none';
    
    updateWeatherDisplay();
    loadNextCity();
}

// End game
function endWeatherGame() {
    weatherGame.gameActive = false;
    
    let message = `Game Over! Final Score: ${weatherGame.score}/${weatherGame.totalRounds * 10} points\n\n`;
    
    if (weatherGame.score >= 40) {
        message += "🌟 Excellent! You're a weather expert!";
    } else if (weatherGame.score >= 30) {
        message += "🌤️ Great job! You have good weather intuition!";
    } else if (weatherGame.score >= 20) {
        message += "☁️ Not bad! Keep practicing your weather guessing!";
    } else {
        message += "🌧️ Weather is tricky! Try again to improve your score!";
    }
    
    document.getElementById('weather-message').textContent = message;
    document.getElementById('weather-message').style.display = 'block';
}

// Update display
function updateWeatherDisplay() {
    document.getElementById('weather-score').textContent = weatherGame.score;
    document.getElementById('weather-round').textContent = weatherGame.round;
}

// Handle Enter key in temperature input
document.addEventListener('DOMContentLoaded', function() {
    const temperatureInput = document.getElementById('temperature-guess');
    if (temperatureInput) {
        temperatureInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitTemperatureGuess();
            }
        });
    }
});

// Start first game when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Don't auto-start, wait for user to click "New Game"
}); 