// Flight Guessing Game
let currentFlight = null;
let guessCount = 0;
let maxGuesses = 5;
let gameActive = false;

// Flight data from CSV
const flightData = [
    {origin: {airport: "ABE", city: "Allentown/Bethlehem/Easton", state: "PA"}, destination: {airport: "CLT", city: "Charlotte", state: "NC"}, hours: 1, minutes: 40, distance: 481},
    {origin: {airport: "ABI", city: "Abilene", state: "TX"}, destination: {airport: "DFW", city: "Dallas/Fort Worth", state: "TX"}, hours: 0, minutes: 42, distance: 158},
    {origin: {airport: "ABQ", city: "Albuquerque", state: "NM"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 34, distance: 1269},
    {origin: {airport: "ABR", city: "Aberdeen", state: "SD"}, destination: {airport: "MSP", city: "Minneapolis", state: "MN"}, hours: 1, minutes: 14, distance: 257},
    {origin: {airport: "ACT", city: "Waco", state: "TX"}, destination: {airport: "DFW", city: "Dallas/Fort Worth", state: "TX"}, hours: 0, minutes: 43, distance: 89},
    {origin: {airport: "ACV", city: "Arcata/Eureka", state: "CA"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 25, distance: 1026},
    {origin: {airport: "ACY", city: "Atlantic City", state: "NJ"}, destination: {airport: "FLL", city: "Fort Lauderdale", state: "FL"}, hours: 2, minutes: 53, distance: 977},
    {origin: {airport: "AEX", city: "Alexandria", state: "LA"}, destination: {airport: "DFW", city: "Dallas/Fort Worth", state: "TX"}, hours: 1, minutes: 16, distance: 285},
    {origin: {airport: "AGS", city: "Augusta", state: "GA"}, destination: {airport: "CLT", city: "Charlotte", state: "NC"}, hours: 0, minutes: 54, distance: 140},
    {origin: {airport: "ALB", city: "Albany", state: "NY"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 47, distance: 853},
    {origin: {airport: "AMA", city: "Amarillo", state: "TX"}, destination: {airport: "DAL", city: "Dallas", state: "TX"}, hours: 1, minutes: 1, distance: 323},
    {origin: {airport: "APN", city: "Alpena", state: "MI"}, destination: {airport: "DTW", city: "Detroit", state: "MI"}, hours: 1, minutes: 12, distance: 198},
    {origin: {airport: "ASE", city: "Aspen", state: "CO"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 3, minutes: 19, distance: 1304},
    {origin: {airport: "ATL", city: "Atlanta", state: "GA"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 3, minutes: 36, distance: 1269},
    {origin: {airport: "ATW", city: "Appleton", state: "WI"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 42, distance: 765},
    {origin: {airport: "AUS", city: "Austin", state: "TX"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 1, minutes: 50, distance: 619},
    {origin: {airport: "AVL", city: "Asheville", state: "NC"}, destination: {airport: "CLT", city: "Charlotte", state: "NC"}, hours: 0, minutes: 50, distance: 91},
    {origin: {airport: "AVP", city: "Scranton/Wilkes-Barre", state: "PA"}, destination: {airport: "CLT", city: "Charlotte", state: "NC"}, hours: 1, minutes: 40, distance: 509},
    {origin: {airport: "BDL", city: "Hartford", state: "CT"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 33, distance: 859},
    {origin: {airport: "BFL", city: "Bakersfield", state: "CA"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 23, distance: 845},
    {origin: {airport: "BGR", city: "Bangor", state: "ME"}, destination: {airport: "DCA", city: "Washington", state: "DC"}, hours: 1, minutes: 53, distance: 590},
    {origin: {airport: "BHM", city: "Birmingham", state: "AL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 0, minutes: 46, distance: 134},
    {origin: {airport: "BIL", city: "Billings", state: "MT"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 46, distance: 878},
    {origin: {airport: "BIS", city: "Bismarck/Mandan", state: "ND"}, destination: {airport: "MSP", city: "Minneapolis", state: "MN"}, hours: 2, minutes: 48, distance: 1092},
    {origin: {airport: "BNA", city: "Nashville", state: "TN"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 0, minutes: 56, distance: 214},
    {origin: {airport: "BOI", city: "Boise", state: "ID"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 3, minutes: 52, distance: 1838},
    {origin: {airport: "BOS", city: "Boston", state: "MA"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 48, distance: 946},
    {origin: {airport: "BTV", city: "Burlington", state: "VT"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 3, minutes: 4, distance: 961},
    {origin: {airport: "BUF", city: "Buffalo", state: "NY"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 1, distance: 712},
    {origin: {airport: "BWI", city: "Baltimore", state: "MD"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 4, minutes: 30, distance: 1670},
    {origin: {airport: "BZN", city: "Bozeman", state: "MT"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 3, minutes: 15, distance: 1640},
    {origin: {airport: "CAE", city: "Columbia", state: "SC"}, destination: {airport: "CLT", city: "Charlotte", state: "NC"}, hours: 0, minutes: 55, distance: 88},
    {origin: {airport: "CHS", city: "Charleston", state: "SC"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 0, minutes: 59, distance: 259},
    {origin: {airport: "CLE", city: "Cleveland", state: "OH"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 43, distance: 554},
    {origin: {airport: "CLT", city: "Charlotte", state: "NC"}, destination: {airport: "ABE", city: "Allentown/Bethlehem/Easton", state: "PA"}, hours: 1, minutes: 31, distance: 481},
    {origin: {airport: "CMH", city: "Columbus", state: "OH"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 21, distance: 447},
    {origin: {airport: "DEN", city: "Denver", state: "CO"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 1, minutes: 6, distance: 349},
    {origin: {airport: "DFW", city: "Dallas/Fort Worth", state: "TX"}, destination: {airport: "ABI", city: "Abilene", state: "TX"}, hours: 0, minutes: 50, distance: 158},
    {origin: {airport: "DTW", city: "Detroit", state: "MI"}, destination: {airport: "ALB", city: "Albany", state: "NY"}, hours: 1, minutes: 55, distance: 489},
    {origin: {airport: "EWR", city: "Newark", state: "NJ"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 18, distance: 746},
    {origin: {airport: "FAR", city: "Fargo", state: "ND"}, destination: {airport: "MSP", city: "Minneapolis", state: "MN"}, hours: 3, minutes: 7, distance: 1220},
    {origin: {airport: "FLL", city: "Fort Lauderdale", state: "FL"}, destination: {airport: "ACY", city: "Atlantic City", state: "NJ"}, hours: 2, minutes: 21, distance: 977},
    {origin: {airport: "GEG", city: "Spokane", state: "WA"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 4, minutes: 9, distance: 1969},
    {origin: {airport: "HNL", city: "Honolulu", state: "HI"}, destination: {airport: "LAX", city: "Los Angeles", state: "CA"}, hours: 5, minutes: 45, distance: 2556},
    {origin: {airport: "IAD", city: "Washington", state: "DC"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 16, distance: 547},
    {origin: {airport: "ICT", city: "Wichita", state: "KS"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 56, distance: 782},
    {origin: {airport: "IND", city: "Indianapolis", state: "IN"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 18, distance: 432},
    {origin: {airport: "JAX", city: "Jacksonville", state: "FL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 2, distance: 270},
    {origin: {airport: "JFK", city: "New York", state: "NY"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 27, distance: 760},
    {origin: {airport: "LAS", city: "Las Vegas", state: "NV"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 1, minutes: 22, distance: 486},
    {origin: {airport: "LAX", city: "Los Angeles", state: "CA"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 1, minutes: 49, distance: 677},
    {origin: {airport: "MCI", city: "Kansas City", state: "MO"}, destination: {airport: "ABQ", city: "Albuquerque", state: "NM"}, hours: 2, minutes: 3, distance: 718},
    {origin: {airport: "MCO", city: "Orlando", state: "FL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 23, distance: 404},
    {origin: {airport: "MDW", city: "Chicago", state: "IL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 15, distance: 606},
    {origin: {airport: "MEM", city: "Memphis", state: "TN"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 0, minutes: 59, distance: 332},
    {origin: {airport: "MIA", city: "Miami", state: "FL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 40, distance: 594},
    {origin: {airport: "MKE", city: "Milwaukee", state: "WI"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 45, distance: 669},
    {origin: {airport: "MSP", city: "Minneapolis", state: "MN"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 25, distance: 906},
    {origin: {airport: "ORD", city: "Chicago", state: "IL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 2, minutes: 15, distance: 606},
    {origin: {airport: "PDX", city: "Portland", state: "OR"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 9, distance: 996},
    {origin: {airport: "PHX", city: "Phoenix", state: "AZ"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 28, distance: 878},
    {origin: {airport: "PIT", city: "Pittsburgh", state: "PA"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 37, distance: 554},
    {origin: {airport: "RDU", city: "Raleigh/Durham", state: "NC"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 2, distance: 355},
    {origin: {airport: "SAN", city: "San Diego", state: "CA"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 23, distance: 853},
    {origin: {airport: "SEA", city: "Seattle", state: "WA"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 25, distance: 1024},
    {origin: {airport: "SFO", city: "San Francisco", state: "CA"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 2, minutes: 26, distance: 967},
    {origin: {airport: "SLC", city: "Salt Lake City", state: "UT"}, destination: {airport: "DEN", city: "Denver", state: "CO"}, hours: 1, minutes: 25, distance: 371},
    {origin: {airport: "STL", city: "St. Louis", state: "MO"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 28, distance: 541},
    {origin: {airport: "TPA", city: "Tampa", state: "FL"}, destination: {airport: "ATL", city: "Atlanta", state: "GA"}, hours: 1, minutes: 17, distance: 405}
];

// State coordinates for map positioning (approximate center points)
const stateCoordinates = {
    'AL': {x: 380, y: 400}, 'AK': {x: 120, y: 480}, 'AZ': {x: 200, y: 350}, 'AR': {x: 320, y: 370},
    'CA': {x: 100, y: 300}, 'CO': {x: 250, y: 300}, 'CT': {x: 520, y: 220}, 'DE': {x: 500, y: 250},
    'FL': {x: 450, y: 450}, 'GA': {x: 420, y: 380}, 'HI': {x: 200, y: 450}, 'ID': {x: 200, y: 200},
    'IL': {x: 340, y: 280}, 'IN': {x: 370, y: 280}, 'IA': {x: 320, y: 250}, 'KS': {x: 280, y: 320},
    'KY': {x: 380, y: 320}, 'LA': {x: 320, y: 420}, 'ME': {x: 550, y: 180}, 'MD': {x: 490, y: 260},
    'MA': {x: 530, y: 210}, 'MI': {x: 370, y: 220}, 'MN': {x: 310, y: 200}, 'MS': {x: 350, y: 400},
    'MO': {x: 320, y: 300}, 'MT': {x: 240, y: 180}, 'NE': {x: 280, y: 260}, 'NV': {x: 150, y: 280},
    'NH': {x: 530, y: 200}, 'NJ': {x: 510, y: 240}, 'NM': {x: 230, y: 340}, 'NY': {x: 480, y: 210},
    'NC': {x: 450, y: 330}, 'ND': {x: 280, y: 180}, 'OH': {x: 410, y: 260}, 'OK': {x: 280, y: 340},
    'OR': {x: 120, y: 180}, 'PA': {x: 470, y: 240}, 'RI': {x: 540, y: 220}, 'SC': {x: 440, y: 360},
    'SD': {x: 280, y: 220}, 'TN': {x: 380, y: 340}, 'TX': {x: 260, y: 380}, 'UT': {x: 210, y: 280},
    'VT': {x: 520, y: 190}, 'VA': {x: 460, y: 280}, 'WA': {x: 150, y: 150}, 'WV': {x: 440, y: 280},
    'WI': {x: 340, y: 200}, 'WY': {x: 240, y: 240}, 'DC': {x: 490, y: 270}
};

function initializeFlightChallenge() {
    newGame();
}

function newGame() {
    currentFlight = flightData[Math.floor(Math.random() * flightData.length)];
    guessCount = 0;
    gameActive = true;
    
    updateDisplay();
    clearFeedback();
    resetInputs();
    
    document.getElementById('flight-submit-btn').disabled = false;
    document.getElementById('flight-play-again-btn').style.display = 'none';
    document.getElementById('flight-final-result').style.display = 'none';
    
    highlightStatesAndDrawPath();
}

function updateDisplay() {
    document.getElementById('flight-origin').textContent = `${currentFlight.origin.city}, ${currentFlight.origin.state}`;
    document.getElementById('flight-destination').textContent = `${currentFlight.destination.city}, ${currentFlight.destination.state}`;
    document.getElementById('flight-guess-count').textContent = `Guess ${guessCount + 1}/${maxGuesses}`;
}

function resetInputs() {
    document.getElementById('flight-hours').value = '';
    document.getElementById('flight-minutes').value = '';
}

function clearFeedback() {
    document.getElementById('flight-hours-feedback').textContent = '';
    document.getElementById('flight-minutes-feedback').textContent = '';
}

function highlightStatesAndDrawPath() {
    const svg = document.getElementById('flight-map');
    if (!svg) return;
    
    // Clear previous highlights
    const paths = svg.querySelectorAll('path');
    paths.forEach(path => {
        path.style.fill = '#e6e6e6';
        path.style.stroke = '#999';
    });
    
    // Remove existing elements
    const existingPath = svg.querySelector('#flight-path');
    const existingMarkers = svg.querySelectorAll('.city-marker');
    if (existingPath) existingPath.remove();
    existingMarkers.forEach(marker => marker.remove());
    
    // Highlight states
    const originState = currentFlight.origin.state;
    const destState = currentFlight.destination.state;
    
    const originPath = svg.querySelector(`[data-state="${originState}"]`);
    const destPath = svg.querySelector(`[data-state="${destState}"]`);
    
    if (originPath) {
        originPath.style.fill = '#4CAF50';
        originPath.style.stroke = '#2E7D32';
    }
    
    if (destPath && destState !== originState) {
        destPath.style.fill = '#2196F3';
        destPath.style.stroke = '#1565C0';
    }
}

function submitGuess() {
    if (!gameActive) return;
    
    const hoursGuess = parseInt(document.getElementById('flight-hours').value);
    const minutesGuess = parseInt(document.getElementById('flight-minutes').value);
    
    if (isNaN(hoursGuess) || isNaN(minutesGuess) || hoursGuess < 0 || minutesGuess < 0 || minutesGuess >= 60) {
        alert('Please enter valid hours (0+) and minutes (0-59)');
        return;
    }
    
    guessCount++;
    
    const actualHours = currentFlight.hours;
    const actualMinutes = currentFlight.minutes;
    
    // Provide feedback for hours
    const hoursFeedback = document.getElementById('flight-hours-feedback');
    if (hoursGuess === actualHours) {
        hoursFeedback.textContent = '✓ Correct!';
        hoursFeedback.style.color = '#4CAF50';
    } else if (hoursGuess < actualHours) {
        hoursFeedback.textContent = '↑ Too low';
        hoursFeedback.style.color = '#f44336';
    } else {
        hoursFeedback.textContent = '↓ Too high';
        hoursFeedback.style.color = '#f44336';
    }
    
    // Provide feedback for minutes
    const minutesFeedback = document.getElementById('flight-minutes-feedback');
    if (minutesGuess === actualMinutes) {
        minutesFeedback.textContent = '✓ Correct!';
        minutesFeedback.style.color = '#4CAF50';
    } else if (minutesGuess < actualMinutes) {
        minutesFeedback.textContent = '↑ Too low';
        minutesFeedback.style.color = '#f44336';
    } else {
        minutesFeedback.textContent = '↓ Too high';
        minutesFeedback.style.color = '#f44336';
    }
    
    // Check if both are correct
    if (hoursGuess === actualHours && minutesGuess === actualMinutes) {
        endGame(true);
        return;
    }
    
    // Check if out of guesses
    if (guessCount >= maxGuesses) {
        endGame(false);
        return;
    }
    
    updateDisplay();
    resetInputs();
}

function endGame(won) {
    gameActive = false;
    document.getElementById('flight-submit-btn').disabled = true;
    
    const resultDiv = document.getElementById('flight-final-result');
    const resultText = document.getElementById('flight-result-text');
    
    if (won) {
        resultText.innerHTML = `
            <span style="color: #4CAF50;">🎉 Congratulations!</span><br>
            You guessed the correct flight time: <strong>${currentFlight.hours}h ${currentFlight.minutes}m</strong><br>
            Distance: <strong>${currentFlight.distance} miles</strong><br>
            Guesses used: <strong>${guessCount}/${maxGuesses}</strong>
        `;
    } else {
        resultText.innerHTML = `
            <span style="color: #f44336;">Better luck next time!</span><br>
            The correct flight time was: <strong>${currentFlight.hours}h ${currentFlight.minutes}m</strong><br>
            Distance: <strong>${currentFlight.distance} miles</strong><br>
            You used all <strong>${maxGuesses}</strong> guesses.
        `;
    }
    
    resultDiv.style.display = 'block';
    document.getElementById('flight-play-again-btn').style.display = 'inline-block';
}

if (window.location.pathname === '/flight-guessing' || window.location.hash === '#flight-guessing') {
    document.addEventListener('DOMContentLoaded', initializeFlightChallenge);
} 