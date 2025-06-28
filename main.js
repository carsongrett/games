// Main navigation and utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    showSection('home');
    
    // Add keyboard event listeners for games
    document.addEventListener('keydown', handleGlobalKeydown);
});

// Section management
function showSection(sectionName) {
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
    
    // Update active nav button
    const activeButton = document.querySelector(`.nav-btn[onclick="showSection('${sectionName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Initialize games when their sections are shown
    if (sectionName === 'wordle' && typeof initializeWordle === 'function') {
        initializeWordle();
    } else if (sectionName === 'nfl-trivia' && typeof initializeNFLTrivia === 'function') {
        initializeNFLTrivia();
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
        showSection('home');
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