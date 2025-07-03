// URL routing configuration
const routes = {
    '/': 'home',
    '/home': 'home',
    '/sports': 'sports',
    '/other': 'other',
    '/privacy-policy': 'privacy-policy',
    '/weather': 'weather-challenge',
    '/nfl-trivia': 'nfl-trivia',
    '/nfl-player-challenge': 'player-challenge',
    '/nba-player-challenge': 'nba-player-challenge',
    '/mlb-team-challenge': 'mlb-player-challenge',
    '/mlb-batter-guessing': 'mlb-batter-guessing',
    '/mlb-standings-challenge': 'mlb-standings-challenge',
    '/color-memory': 'color-memory',
    '/rent-guessing': 'rent-guessing',
    '/flight-guessing': 'flight-guessing'
};

// Reverse mapping for generating URLs
const sectionToRoute = {
    'home': '/',
    'sports': '/sports',
    'other': '/other',
    'privacy-policy': '/privacy-policy',
    'weather-challenge': '/weather',
    'nfl-trivia': '/nfl-trivia',
    'player-challenge': '/nfl-player-challenge',
    'nba-player-challenge': '/nba-player-challenge',
    'mlb-player-challenge': '/mlb-team-challenge',
    'mlb-batter-guessing': '/mlb-batter-guessing',
    'mlb-standings-challenge': '/mlb-standings-challenge',
    'color-memory': '/color-memory',
    'rent-guessing': '/rent-guessing',
    'flight-guessing': '/flight-guessing'
};

// Game categorization
const gameCategories = {
    'nfl-trivia': 'sports',
    'player-challenge': 'sports',
    'nba-player-challenge': 'sports',
    'mlb-player-challenge': 'sports',
    'mlb-batter-guessing': 'sports',
    'mlb-standings-challenge': 'sports',
    'color-memory': 'other',
    'weather-challenge': 'other',
    'rent-guessing': 'other',
    'flight-guessing': 'other'
};

// Game titles for page titles and breadcrumbs
const gameTitles = {
    'home': 'Games - Sports & Fun Challenges',
    'sports': 'Sports Games',
    'other': 'Other Games',
    'privacy-policy': 'Privacy Policy',
    'weather-challenge': 'Weather Challenge',
    'nfl-trivia': 'NFL Trivia',
    'player-challenge': 'NFL Player Challenge',
    'nba-player-challenge': 'NBA Player Challenge',
    'mlb-player-challenge': 'MLB Team Challenge',
    'mlb-batter-guessing': 'MLB Batter Challenge',
    'mlb-standings-challenge': 'MLB Standings Challenge',
    'color-memory': 'Color Memory',
    'rent-guessing': 'Rent Guessing',
    'flight-guessing': 'Flight Time Challenge'
};

// Breadcrumb management
function updateBreadcrumb(sectionName) {
    const breadcrumbElement = document.getElementById('breadcrumb');
    if (!breadcrumbElement) return;
    
    let breadcrumbHTML = '<span onclick="navigateToRoute(\'/\')" class="breadcrumb-link">Home</span>';
    
    if (sectionName === 'sports' || sectionName === 'other') {
        breadcrumbHTML += ` <span class="breadcrumb-separator">></span> <span class="breadcrumb-current">${gameTitles[sectionName]}</span>`;
    } else if (gameCategories[sectionName]) {
        const category = gameCategories[sectionName];
        const categoryTitle = gameTitles[category];
        const categoryRoute = sectionToRoute[category];
        breadcrumbHTML += ` <span class="breadcrumb-separator">></span> <span onclick="navigateToRoute('${categoryRoute}')" class="breadcrumb-link">${categoryTitle}</span>`;
        breadcrumbHTML += ` <span class="breadcrumb-separator">></span> <span class="breadcrumb-current">${gameTitles[sectionName]}</span>`;
    } else if (sectionName === 'privacy-policy') {
        breadcrumbHTML += ` <span class="breadcrumb-separator">></span> <span class="breadcrumb-current">Privacy Policy</span>`;
    }
    
    breadcrumbElement.innerHTML = breadcrumbHTML;
}

// Get back navigation for games
function getBackRoute(sectionName) {
    if (gameCategories[sectionName]) {
        return sectionToRoute[gameCategories[sectionName]];
    }
    return '/';
}

// Main navigation and utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Add browser navigation handlers
    window.addEventListener('popstate', handleBrowserNavigation);
    
    // Initialize the site based on current URL
    handleBrowserNavigation();
    
    // Add keyboard event listeners for games
    document.addEventListener('keydown', handleGlobalKeydown);
    
    // Add privacy policy link to footer if it exists
    addPrivacyPolicyLink();
});

// Add privacy policy link to footer
function addPrivacyPolicyLink() {
    const footer = document.querySelector('footer') || document.body;
    if (!document.getElementById('privacy-link')) {
        const privacyLink = document.createElement('div');
        privacyLink.id = 'privacy-link';
        privacyLink.innerHTML = '<a href="#" onclick="navigateToRoute(\'/privacy-policy\')" style="color: #6b7280; font-size: 0.875rem; text-decoration: none; padding: 1rem; display: inline-block;">Privacy Policy</a>';
        privacyLink.style.textAlign = 'center';
        privacyLink.style.marginTop = '2rem';
        footer.appendChild(privacyLink);
    }
}

// Handle browser back/forward navigation
function handleBrowserNavigation() {
    const path = window.location.pathname || '/';
    const sectionName = routes[path] || 'home';
    showSection(sectionName, false); // false = don't push to history
}

// Navigate to a specific route
function navigateToRoute(route) {
    const sectionName = routes[route] || 'home';
    const fullPath = route;
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
    
    // Update breadcrumb
    updateBreadcrumb(sectionName);
    
    // Update browser URL if needed
    if (pushToHistory && sectionToRoute[sectionName]) {
        const route = sectionToRoute[sectionName];
        const fullPath = route;
        window.history.pushState({ route }, '', fullPath);
    }
    
    // Update active nav button
    const activeButton = document.querySelector(`.nav-btn[data-section="${sectionName}"]`) || 
                        document.querySelector(`.nav-btn[data-section="${gameCategories[sectionName]}"]`) ||
                        document.querySelector(`.nav-btn[data-section="home"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update back buttons in games
    updateBackButtons(sectionName);
    
    // Initialize games when their sections are shown
    if (sectionName === 'wordle' && typeof initializeWordle === 'function') {
        initializeWordle();
    } else if (sectionName === 'nfl-trivia' && typeof initializeNFLTrivia === 'function') {
        initializeNFLTrivia();
    } else if (sectionName === 'player-challenge' && typeof initializePlayerChallenge === 'function') {
        console.log('Initializing NFL Player Challenge...');
        initializePlayerChallenge().catch(error => {
            console.error('Error initializing NFL Player Challenge:', error);
        });
    } else if (sectionName === 'weather-challenge' && typeof initializeWeatherChallenge === 'function') {
        initializeWeatherChallenge();
    } else if (sectionName === 'rent-guessing' && typeof initializeRentGuessing === 'function') {
        initializeRentGuessing();
    } else if (sectionName === 'flight-guessing' && typeof initializeFlightChallenge === 'function') {
        initializeFlightChallenge();
    } else if (sectionName === 'mlb-batter-guessing' && typeof initializeMLBBatterGame === 'function') {
        initializeMLBBatterGame();
    } else if (sectionName === 'mlb-standings-challenge' && typeof initializeMLBStandingsGame === 'function') {
        initializeMLBStandingsGame();
    }
}

// Update back buttons to navigate to appropriate category
function updateBackButtons(sectionName) {
    const backButtons = document.querySelectorAll('.back-btn');
    const backRoute = getBackRoute(sectionName);
    
    backButtons.forEach(btn => {
        btn.onclick = function() {
            navigateToRoute(backRoute);
        };
        
        // Update button text based on destination
        if (gameCategories[sectionName]) {
            const categoryName = gameTitles[gameCategories[sectionName]];
            btn.textContent = `← Back to ${categoryName}`;
        } else {
            btn.textContent = '← Back to Home';
        }
    });
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
    
    // Handle escape key to go back appropriately
    if (event.key === 'Escape' && sectionId !== 'home') {
        const backRoute = getBackRoute(sectionId);
        navigateToRoute(backRoute);
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