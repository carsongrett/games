// URL routing configuration
const routes = {
    '/': 'home',
    '/home': 'home',
    '/weather': 'weather-challenge',
    '/nfl-trivia': 'nfl-trivia',
    '/nfl-player-challenge': 'player-challenge',
    '/nba-player-challenge': 'nba-player-challenge',
    '/mlb-team-challenge': 'mlb-player-challenge',
    '/color-memory': 'color-memory'
};

// Reverse mapping for generating URLs
const sectionToRoute = {
    'home': '/',
    'weather-challenge': '/weather',
    'nfl-trivia': '/nfl-trivia',
    'player-challenge': '/nfl-player-challenge',
    'nba-player-challenge': '/nba-player-challenge',
    'mlb-player-challenge': '/mlb-team-challenge',
    'color-memory': '/color-memory'
};

// Game titles for page titles
const gameTitles = {
    'home': 'Games - Sports & Fun Challenges',
    'weather-challenge': 'Weather Challenge - Guess City Temperatures',
    'nfl-trivia': 'NFL Trivia - Test Your Football Knowledge',
    'player-challenge': 'NFL Player Challenge - Guess the Player',
    'nba-player-challenge': 'NBA Player Challenge - Guess the Player',
    'mlb-player-challenge': 'MLB Team Challenge - Guess the Team',
    'color-memory': 'Color Memory - Memory Sequence Game'
};

// Main navigation and utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Add browser navigation handlers
    window.addEventListener('popstate', handleBrowserNavigation);
    
    // Initialize the site based on current URL
    handleBrowserNavigation();
    
    // Add keyboard event listeners for games
    document.addEventListener('keydown', handleGlobalKeydown);
});

// Handle browser back/forward navigation
function handleBrowserNavigation() {
    const path = window.location.pathname;
    const basePath = path.replace('/games', '') || '/';
    const sectionName = routes[basePath] || 'home';
    showSection(sectionName, false); // false = don't push to history
}

// Navigate to a specific route
function navigateToRoute(route) {
    const sectionName = routes[route] || 'home';
    const fullPath = '/games' + route;
    window.history.pushState({ route }, '', fullPath);
    showSection(sectionName, false);
}

// Section management
function showSection(sectionName, pushToHistory = true) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update page title
    if (gameTitles[sectionName]) {
        document.title = gameTitles[sectionName];
    }
    
    // Update browser URL if needed
    if (pushToHistory && sectionToRoute[sectionName]) {
        const route = sectionToRoute[sectionName];
        const fullPath = '/games' + route;
        window.history.pushState({ route }, '', fullPath);
    }
    
    // Update active nav button (for home button)
    if (sectionName === 'home') {
        const homeButton = document.querySelector('.nav-btn[data-section="home"]');
        if (homeButton) {
            homeButton.classList.add('active');
        }
    }
    
    // Initialize games when their sections are shown
    if (sectionName === 'wordle' && typeof initializeWordle === 'function') {
        initializeWordle();
    } else if (sectionName === 'nfl-trivia' && typeof initializeNFLTrivia === 'function') {
        initializeNFLTrivia();
    } else if (sectionName === 'player-challenge' && typeof initializePlayerChallenge === 'function') {
        initializePlayerChallenge();
    } else if (sectionName === 'weather-challenge' && typeof initializeWeatherChallenge === 'function') {
        initializeWeatherChallenge();
    }
}

// Global keyboard event handler
function handleGlobalKeydown(event) {
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) return;
    
    const sectionId = activeSection.id;
    
    // Handle keyboard events for specific games
    if (sectionId === 'wordle' && typeof handleWordleKeydown === 'function') {
        handleWordleKeydown(event);
    }
    
    // Handle escape key to go back to home
    if (event.key === 'Escape' && sectionId !== 'home') {
        navigateToRoute('/');
    }
}

// Utility functions
function showMessage(elementId, message, type = 'info', duration = 3000) {
    const messageElement = document.getElementById(elementId);
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.className = `game-message ${type}`;
    messageElement.style.display = 'block';
    
    if (duration > 0) {
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, duration);
    }
}

function hideMessage(elementId) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

// Random utility function
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array utility
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 