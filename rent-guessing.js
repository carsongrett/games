// Rent Guessing Game - 5 Rounds with 3 Guesses Each
let rentGame = {
    currentEntry: null,
    currentRent: 0,
    guessCount: 0,
    maxGuesses: 3,
    currentRound: 1,
    maxRounds: 5,
    totalScore: 0,
    gameActive: false,
    usedEntries: [],
    availableEntries: []
};

// Rent data from the CSV (cleaned and formatted)
const rentData = [
    { region: "Atlanta, GA", bedrooms: 1, rent: 1417, state: "GA" },
    { region: "Atlanta, GA", bedrooms: 2, rent: 1628, state: "GA" },
    { region: "Atlanta, GA", bedrooms: "3+", rent: 1933, state: "GA" },
    { region: "Austin, TX", bedrooms: 1, rent: 1259, state: "TX" },
    { region: "Austin, TX", bedrooms: 2, rent: 1499, state: "TX" },
    { region: "Austin, TX", bedrooms: "3+", rent: 2110, state: "TX" },
    { region: "Baltimore, MD", bedrooms: 1, rent: 1474, state: "MD" },
    { region: "Baltimore, MD", bedrooms: 2, rent: 1635, state: "MD" },
    { region: "Baltimore, MD", bedrooms: "3+", rent: 1960, state: "MD" },
    { region: "Boston, MA", bedrooms: 1, rent: 2605, state: "MA" },
    { region: "Boston, MA", bedrooms: 2, rent: 3100, state: "MA" },
    { region: "Boston, MA", bedrooms: "3+", rent: 3778, state: "MA" },
    { region: "Charlotte, NC", bedrooms: 1, rent: 1356, state: "NC" },
    { region: "Charlotte, NC", bedrooms: 2, rent: 1571, state: "NC" },
    { region: "Charlotte, NC", bedrooms: "3+", rent: 1880, state: "NC" },
    { region: "Chicago, IL", bedrooms: 1, rent: 1689, state: "IL" },
    { region: "Chicago, IL", bedrooms: 2, rent: 1961, state: "IL" },
    { region: "Chicago, IL", bedrooms: "3+", rent: 2440, state: "IL" },
    { region: "Cincinnati, OH", bedrooms: 1, rent: 1381, state: "OH" },
    { region: "Cincinnati, OH", bedrooms: 2, rent: 1463, state: "OH" },
    { region: "Cincinnati, OH", bedrooms: "3+", rent: 1783, state: "OH" },
    { region: "Dallas, TX", bedrooms: 1, rent: 1354, state: "TX" },
    { region: "Dallas, TX", bedrooms: 2, rent: 1674, state: "TX" },
    { region: "Dallas, TX", bedrooms: "3+", rent: 2130, state: "TX" },
    { region: "Denver, CO", bedrooms: 1, rent: 1634, state: "CO" },
    { region: "Denver, CO", bedrooms: 2, rent: 2024, state: "CO" },
    { region: "Denver, CO", bedrooms: "3+", rent: 2665, state: "CO" },
    { region: "Detroit, MI", bedrooms: 1, rent: 1190, state: "MI" },
    { region: "Detroit, MI", bedrooms: 2, rent: 1500, state: "MI" },
    { region: "Detroit, MI", bedrooms: "3+", rent: 2017, state: "MI" },
    { region: "Houston, TX", bedrooms: 1, rent: 1129, state: "TX" },
    { region: "Houston, TX", bedrooms: 2, rent: 1399, state: "TX" },
    { region: "Houston, TX", bedrooms: "3+", rent: 1780, state: "TX" },
    { region: "Indianapolis, IN", bedrooms: 1, rent: 1270, state: "IN" },
    { region: "Indianapolis, IN", bedrooms: 2, rent: 1474, state: "IN" },
    { region: "Indianapolis, IN", bedrooms: "3+", rent: 1720, state: "IN" },
    { region: "Jacksonville, FL", bedrooms: 1, rent: 1343, state: "FL" },
    { region: "Jacksonville, FL", bedrooms: 2, rent: 1593, state: "FL" },
    { region: "Jacksonville, FL", bedrooms: "3+", rent: 1833, state: "FL" },
    { region: "Las Vegas, NV", bedrooms: 1, rent: 1288, state: "NV" },
    { region: "Las Vegas, NV", bedrooms: 2, rent: 1579, state: "NV" },
    { region: "Las Vegas, NV", bedrooms: "3+", rent: 1875, state: "NV" },
    { region: "Los Angeles, CA", bedrooms: 1, rent: 2450, state: "CA" },
    { region: "Los Angeles, CA", bedrooms: 2, rent: 3162, state: "CA" },
    { region: "Los Angeles, CA", bedrooms: "3+", rent: 3897, state: "CA" },
    { region: "Miami, FL", bedrooms: 1, rent: 2163, state: "FL" },
    { region: "Miami, FL", bedrooms: 2, rent: 2554, state: "FL" },
    { region: "Miami, FL", bedrooms: "3+", rent: 2995, state: "FL" },
    { region: "Minneapolis, MN", bedrooms: 1, rent: 1411, state: "MN" },
    { region: "Minneapolis, MN", bedrooms: 2, rent: 1779, state: "MN" },
    { region: "Minneapolis, MN", bedrooms: "3+", rent: 2238, state: "MN" },
    { region: "Nashville, TN", bedrooms: 1, rent: 1415, state: "TN" },
    { region: "Nashville, TN", bedrooms: 2, rent: 1609, state: "TN" },
    { region: "Nashville, TN", bedrooms: "3+", rent: 1788, state: "TN" },
    { region: "New York, NY", bedrooms: 1, rent: 2650, state: "NY" },
    { region: "New York, NY", bedrooms: 2, rent: 3290, state: "NY" },
    { region: "New York, NY", bedrooms: "3+", rent: 4425, state: "NY" },
    { region: "Orlando, FL", bedrooms: 1, rent: 1578, state: "FL" },
    { region: "Orlando, FL", bedrooms: 2, rent: 1863, state: "FL" },
    { region: "Orlando, FL", bedrooms: "3+", rent: 2165, state: "FL" },
    { region: "Philadelphia, PA", bedrooms: 1, rent: 1765, state: "PA" },
    { region: "Philadelphia, PA", bedrooms: 2, rent: 2134, state: "PA" },
    { region: "Philadelphia, PA", bedrooms: "3+", rent: 2800, state: "PA" },
    { region: "Phoenix, AZ", bedrooms: 1, rent: 1342, state: "AZ" },
    { region: "Phoenix, AZ", bedrooms: 2, rent: 1610, state: "AZ" },
    { region: "Phoenix, AZ", bedrooms: "3+", rent: 2140, state: "AZ" },
    { region: "Pittsburgh, PA", bedrooms: 1, rent: 1360, state: "PA" },
    { region: "Pittsburgh, PA", bedrooms: 2, rent: 1645, state: "PA" },
    { region: "Portland, OR", bedrooms: 1, rent: 1685, state: "OR" },
    { region: "Portland, OR", bedrooms: 2, rent: 1855, state: "OR" },
    { region: "Portland, OR", bedrooms: "3+", rent: 2325, state: "OR" },
    { region: "Riverside, CA", bedrooms: 1, rent: 2075, state: "CA" },
    { region: "Riverside, CA", bedrooms: 2, rent: 2465, state: "CA" },
    { region: "Riverside, CA", bedrooms: "3+", rent: 3363, state: "CA" },
    { region: "Sacramento, CA", bedrooms: 1, rent: 1799, state: "CA" },
    { region: "Sacramento, CA", bedrooms: 2, rent: 2206, state: "CA" },
    { region: "Sacramento, CA", bedrooms: "3+", rent: 2785, state: "CA" },
    { region: "San Diego, CA", bedrooms: 1, rent: 2461, state: "CA" },
    { region: "San Diego, CA", bedrooms: 2, rent: 2933, state: "CA" },
    { region: "San Diego, CA", bedrooms: "3+", rent: 3567, state: "CA" },
    { region: "San Francisco, CA", bedrooms: 1, rent: 2497, state: "CA" },
    { region: "San Francisco, CA", bedrooms: 2, rent: 3015, state: "CA" },
    { region: "San Jose, CA", bedrooms: 1, rent: 2956, state: "CA" },
    { region: "San Jose, CA", bedrooms: 2, rent: 3681, state: "CA" },
    { region: "San Jose, CA", bedrooms: "3+", rent: 4228, state: "CA" },
    { region: "Seattle, WA", bedrooms: 1, rent: 1896, state: "WA" },
    { region: "Seattle, WA", bedrooms: 2, rent: 2220, state: "WA" },
    { region: "Seattle, WA", bedrooms: "3+", rent: 2515, state: "WA" },
    { region: "Tampa, FL", bedrooms: 1, rent: 1636, state: "FL" },
    { region: "Tampa, FL", bedrooms: 2, rent: 1863, state: "FL" },
    { region: "Tampa, FL", bedrooms: "3+", rent: 2365, state: "FL" },
    { region: "Virginia Beach, VA", bedrooms: 1, rent: 1425, state: "VA" },
    { region: "Virginia Beach, VA", bedrooms: 2, rent: 1599, state: "VA" },
    { region: "Virginia Beach, VA", bedrooms: "3+", rent: 1955, state: "VA" },
    { region: "Washington, DC", bedrooms: 1, rent: 1969, state: "DC" },
    { region: "Washington, DC", bedrooms: 2, rent: 2300, state: "DC" },
    { region: "Washington, DC", bedrooms: "3+", rent: 2437, state: "DC" },
    { region: "Buffalo, NY", bedrooms: 1, rent: 1275, state: "NY" },
    { region: "Buffalo, NY", bedrooms: 2, rent: 1343, state: "NY" },
    { region: "Cleveland, OH", bedrooms: 1, rent: 1100, state: "OH" },
    { region: "Cleveland, OH", bedrooms: 2, rent: 1380, state: "OH" },
    { region: "Cleveland, OH", bedrooms: "3+", rent: 1783, state: "OH" },
    { region: "Columbus, OH", bedrooms: 1, rent: 1291, state: "OH" },
    { region: "Columbus, OH", bedrooms: 2, rent: 1544, state: "OH" },
    { region: "Louisville, KY", bedrooms: 1, rent: 1160, state: "KY" },
    { region: "Louisville, KY", bedrooms: 2, rent: 1341, state: "KY" },
    { region: "Memphis, TN", bedrooms: 1, rent: 1175, state: "TN" },
    { region: "Memphis, TN", bedrooms: 2, rent: 1325, state: "TN" },
    { region: "Providence, RI", bedrooms: 1, rent: 1963, state: "RI" },
    { region: "Providence, RI", bedrooms: 2, rent: 2445, state: "RI" },
    { region: "Raleigh, NC", bedrooms: 1, rent: 1349, state: "NC" },
    { region: "Raleigh, NC", bedrooms: 2, rent: 1550, state: "NC" },
    { region: "Raleigh, NC", bedrooms: "3+", rent: 1847, state: "NC" },
    { region: "Richmond, VA", bedrooms: 1, rent: 1411, state: "VA" },
    { region: "Richmond, VA", bedrooms: 2, rent: 1672, state: "VA" },
    { region: "Salt Lake City, UT", bedrooms: 1, rent: 1400, state: "UT" },
    { region: "Salt Lake City, UT", bedrooms: 2, rent: 1697, state: "UT" },
    { region: "Salt Lake City, UT", bedrooms: "3+", rent: 1994, state: "UT" },
    { region: "St. Louis, MO", bedrooms: 1, rent: 1180, state: "MO" },
    { region: "St. Louis, MO", bedrooms: 2, rent: 1376, state: "MO" },
    { region: "St. Louis, MO", bedrooms: "3+", rent: 1644, state: "MO" }
];

// Simple US SVG Map
const usSvgMap = `
<svg viewBox="0 0 1000 600" class="us-map">
  <!-- Alaska -->
  <path id="AK" d="M158 458l7-36 5-8 12-23 15-17 21-17 20-12 18-10 17-5 17-3 17-1 17 1 17 3 15 5 15 7 13 9 11 11 9 13 7 15 5 17 3 17 1 17-1 17-3 17-5 15-7 13-9 11-11 9-13 7-15 5-17 3-17 1-17z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Hawaii -->
  <circle id="HI" cx="230" cy="410" r="8" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Washington -->
  <path id="WA" d="M158 56l132 0 0 74-132 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Oregon -->
  <path id="OR" d="M158 130l132 0 0 56-132 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- California -->
  <path id="CA" d="M158 186l68 0 8 58 8 58 8 58-84 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Nevada -->
  <path id="NV" d="M242 186l48 0 0 134-40 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Idaho -->
  <path id="ID" d="M290 56l52 0 0 130-52 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Montana -->
  <path id="MT" d="M342 56l136 0 0 74-136 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Wyoming -->
  <path id="WY" d="M342 130l136 0 0 56-136 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Utah -->
  <path id="UT" d="M290 186l52 0 0 78-52 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Colorado -->
  <path id="CO" d="M342 186l136 0 0 78-136 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Arizona -->
  <path id="AZ" d="M290 264l52 0 0 78-52 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- New Mexico -->
  <path id="NM" d="M342 264l68 0 0 78-68 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- North Dakota -->
  <path id="ND" d="M478 56l88 0 0 74-88 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- South Dakota -->
  <path id="SD" d="M478 130l88 0 0 56-88 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Nebraska -->
  <path id="NE" d="M478 186l88 0 0 56-88 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Kansas -->
  <path id="KS" d="M478 242l88 0 0 44-88 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Oklahoma -->
  <path id="OK" d="M478 286l88 0 12 0 0 34-100 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Texas -->
  <path id="TX" d="M410 320l68 0 12 0 34 0 0 68-26 0-20 34-28 0-24-20-16-28z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Minnesota -->
  <path id="MN" d="M566 56l66 0 0 96-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Iowa -->
  <path id="IA" d="M566 186l66 0 0 56-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Missouri -->
  <path id="MO" d="M566 242l66 0 0 56-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Arkansas -->
  <path id="AR" d="M566 298l66 0 0 44-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Louisiana -->
  <path id="LA" d="M566 342l66 0 0 46-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Wisconsin -->
  <path id="WI" d="M632 56l44 0 0 96-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Illinois -->
  <path id="IL" d="M632 152l44 0 0 90-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Mississippi -->
  <path id="MS" d="M632 298l44 0 0 90-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Alabama -->
  <path id="AL" d="M676 298l44 0 0 90-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Tennessee -->
  <path id="TN" d="M676 242l88 0 0 56-88 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Kentucky -->
  <path id="KY" d="M676 186l88 0 0 56-88 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Indiana -->
  <path id="IN" d="M676 152l44 0 0 90-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Michigan -->
  <path id="MI" d="M720 56l44 0 0 96-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Ohio -->
  <path id="OH" d="M720 152l44 0 0 90-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Georgia -->
  <path id="GA" d="M720 298l44 0 0 90-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Florida -->
  <path id="FL" d="M720 388l44 0 34 0 0 44-78 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- South Carolina -->
  <path id="SC" d="M764 298l44 0 0 46-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- North Carolina -->
  <path id="NC" d="M764 242l66 0 0 56-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Virginia -->
  <path id="VA" d="M764 186l66 0 0 56-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- West Virginia -->
  <path id="WV" d="M764 152l44 0 0 34-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Pennsylvania -->
  <path id="PA" d="M764 96l66 0 0 56-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Maryland -->
  <path id="MD" d="M808 152l22 0 0 22-22 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Delaware -->
  <path id="DE" d="M830 152l12 0 0 34-12 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- New Jersey -->
  <path id="NJ" d="M830 96l22 0 0 56-22 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- New York -->
  <path id="NY" d="M830 56l66 0 0 74-66 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Connecticut -->
  <path id="CT" d="M852 96l22 0 0 22-22 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Rhode Island -->
  <path id="RI" d="M874 96l11 0 0 22-11 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Massachusetts -->
  <path id="MA" d="M885 96l44 0 0 22-44 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Vermont -->
  <path id="VT" d="M896 56l22 0 0 40-22 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- New Hampshire -->
  <path id="NH" d="M918 56l22 0 0 40-22 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Maine -->
  <path id="ME" d="M940 56l34 0 0 62-34 0z" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
  
  <!-- Washington DC -->
  <circle id="DC" cx="819" cy="163" r="4" fill="#d1d5db" stroke="#fff" stroke-width="1"/>
</svg>
`;

// Initialize game when section is opened
function initializeRentGuessing() {
    if (!rentGame.gameActive && !rentGame.currentEntry) {
        newRentGame();
    }
}

// Start new game
function newRentGame() {
    rentGame.gameActive = true;
    rentGame.guessCount = 0;
    rentGame.currentRound = 1;
    rentGame.totalScore = 0;
    rentGame.usedEntries = [];
    rentGame.availableEntries = [...rentData];
    
    // Clear previous game state
    document.getElementById('rent-guess-input').value = '';
    document.getElementById('rent-guess-input').disabled = false;
    document.getElementById('submit-rent-guess').disabled = false;
    document.getElementById('rent-feedback').style.display = 'none';
    document.getElementById('rent-result').style.display = 'none';
    document.getElementById('play-again-btn').style.display = 'none';
    
    loadNewRentChallenge();
}

// Load a new rent challenge
function loadNewRentChallenge() {
    // Select random entry from available entries
    if (rentGame.availableEntries.length === 0) {
        rentGame.availableEntries = [...rentData];
        rentGame.usedEntries = [];
    }
    
    const randomIndex = Math.floor(Math.random() * rentGame.availableEntries.length);
    rentGame.currentEntry = rentGame.availableEntries[randomIndex];
    rentGame.currentRent = rentGame.currentEntry.rent;
    
    // Move entry from available to used
    rentGame.usedEntries.push(rentGame.currentEntry);
    rentGame.availableEntries.splice(randomIndex, 1);
    
    // Reset round state
    rentGame.guessCount = 0;
    
    // Update display
    document.getElementById('rent-region').textContent = rentGame.currentEntry.region;
    document.getElementById('rent-bedrooms').textContent = `${rentGame.currentEntry.bedrooms} bedroom${rentGame.currentEntry.bedrooms === 1 ? '' : 's'}`;
    
    // Clear previous round feedback
    document.getElementById('rent-feedback').style.display = 'none';
    document.getElementById('rent-result').style.display = 'none';
    document.getElementById('rent-guess-input').disabled = false;
    document.getElementById('submit-rent-guess').disabled = false;
    document.getElementById('rent-guess-input').value = '';
    
    updateRentGameDisplay();
    
    // Focus input
    document.getElementById('rent-guess-input').focus();
}

// Submit rent guess
function submitRentGuess() {
    const guess = parseInt(document.getElementById('rent-guess-input').value);
    
    if (isNaN(guess) || guess <= 0) {
        alert('Please enter a valid rent amount');
        return;
    }
    
    if (!rentGame.gameActive) {
        return;
    }
    
    rentGame.guessCount++;
    
    const difference = Math.abs(guess - rentGame.currentRent);
    const isWithin50 = difference <= 50;
    
    // Check if guess is within $50 (correct)
    if (isWithin50) {
        // Correct guess!
        const points = calculatePoints(difference, rentGame.guessCount);
        rentGame.totalScore += points;
        endRentRound(true, guess, points);
    } else if (rentGame.guessCount >= rentGame.maxGuesses) {
        // Out of guesses - calculate proximity points
        const points = calculateProximityPoints(difference);
        rentGame.totalScore += points;
        endRentRound(false, guess, points);
    } else {
        // Show higher/lower feedback for first 2 guesses
        const feedback = guess < rentGame.currentRent ? 'Higher!' : 'Lower!';
        showRentFeedback(feedback, guess);
    }
    
    updateRentGameDisplay();
}

// Calculate points for correct guesses
function calculatePoints(difference, guessNumber) {
    if (difference === 0) return 100; // Perfect guess
    if (difference <= 25) return guessNumber === 1 ? 90 : guessNumber === 2 ? 80 : 70;
    if (difference <= 50) return guessNumber === 1 ? 70 : guessNumber === 2 ? 60 : 50;
    return 0;
}

// Calculate proximity points for third guess when not within $50
function calculateProximityPoints(difference) {
    if (difference <= 100) return 30;
    if (difference <= 200) return 20;
    if (difference <= 400) return 10;
    if (difference <= 600) return 5;
    return 0;
}

// Show feedback
function showRentFeedback(feedback, guess) {
    const feedbackDiv = document.getElementById('rent-feedback');
    document.getElementById('rent-feedback-text').textContent = `$${guess.toLocaleString()} - ${feedback}`;
    feedbackDiv.style.display = 'block';
    
    // Clear input for next guess
    document.getElementById('rent-guess-input').value = '';
    document.getElementById('rent-guess-input').focus();
}

// End round
function endRentRound(won, finalGuess, points) {
    // Hide feedback and input for this round
    document.getElementById('rent-feedback').style.display = 'none';
    document.getElementById('rent-guess-input').disabled = true;
    document.getElementById('submit-rent-guess').disabled = true;
    
    // Show result
    const resultDiv = document.getElementById('rent-result');
    const actualRent = rentGame.currentRent;
    const difference = Math.abs(finalGuess - actualRent);
    
    let resultMessage = '';
    if (won) {
        resultMessage = `
            <strong>✅ Correct!</strong><br>
            Your guess: $${finalGuess.toLocaleString()}<br>
            Actual rent: $${actualRent.toLocaleString()}<br>
            Points earned: ${points}<br>
            Guesses used: ${rentGame.guessCount}
        `;
    } else {
        resultMessage = `
            <strong>❌ Round Complete</strong><br>
            Your final guess: $${finalGuess.toLocaleString()}<br>
            Actual rent: $${actualRent.toLocaleString()}<br>
            Difference: $${difference.toLocaleString()}<br>
            Points earned: ${points}
        `;
    }
    
    document.getElementById('rent-result-text').innerHTML = resultMessage;
    resultDiv.style.display = 'block';
    
    // Check if game is complete
    if (rentGame.currentRound >= rentGame.maxRounds) {
        // Game complete
        setTimeout(() => {
            endRentGame();
        }, 3000);
    } else {
        // Show next round button
        setTimeout(() => {
            nextRentRound();
        }, 3000);
    }
}

// Move to next round
function nextRentRound() {
    rentGame.currentRound++;
    if (rentGame.currentRound <= rentGame.maxRounds) {
        loadNewRentChallenge();
    } else {
        endRentGame();
    }
}

// End entire game
function endRentGame() {
    rentGame.gameActive = false;
    
    // Show final results
    const resultDiv = document.getElementById('rent-result');
    const averageScore = Math.round(rentGame.totalScore / rentGame.maxRounds);
    
    let gameMessage = '';
    if (rentGame.totalScore >= 400) {
        gameMessage = `🏆 Excellent! Total Score: ${rentGame.totalScore}/500`;
    } else if (rentGame.totalScore >= 300) {
        gameMessage = `🎯 Great job! Total Score: ${rentGame.totalScore}/500`;
    } else if (rentGame.totalScore >= 200) {
        gameMessage = `👍 Good work! Total Score: ${rentGame.totalScore}/500`;
    } else {
        gameMessage = `📈 Keep practicing! Total Score: ${rentGame.totalScore}/500`;
    }
    
    document.getElementById('rent-result-text').innerHTML = `
        <strong>🎮 Game Complete!</strong><br>
        ${gameMessage}<br>
        Average per round: ${averageScore} points
    `;
    
    resultDiv.style.display = 'block';
    document.getElementById('play-again-btn').style.display = 'inline-block';
}

// Update game display
function updateRentGameDisplay() {
    document.getElementById('rent-guess-count').textContent = `${rentGame.guessCount}/${rentGame.maxGuesses}`;
    if (document.getElementById('rent-round')) {
        document.getElementById('rent-round').textContent = `${rentGame.currentRound}`;
    }
    if (document.getElementById('rent-total-score')) {
        document.getElementById('rent-total-score').textContent = rentGame.totalScore;
    }
}

// Handle Enter key in rent input
document.addEventListener('DOMContentLoaded', function() {
    const rentInput = document.getElementById('rent-guess-input');
    if (rentInput) {
        rentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitRentGuess();
            }
        });
    }
}); 