// Math Hunt Game Logic
let mathHuntGrid = [];
let mathHuntSelectedNumbers = [];
let mathHuntTargetNumber = 0;
let mathHuntScore = 0;
let mathHuntTimeLeft = 90;
let mathHuntGameTimer;
let mathHuntGameActive = false;

function generateRandomNumber() {
    return Math.floor(Math.random() * 12) + 1;
}

function createMathHuntGrid() {
    mathHuntGrid = [];
    for (let i = 0; i < 16; i++) {
        mathHuntGrid.push(generateRandomNumber());
    }
}

function selectRandomPair() {
    const index1 = Math.floor(Math.random() * 16);
    let index2;
    do {
        index2 = Math.floor(Math.random() * 16);
    } while (index2 === index1);
    
    mathHuntTargetNumber = mathHuntGrid[index1] * mathHuntGrid[index2];
    document.getElementById('math-hunt-target-number').textContent = mathHuntTargetNumber;
}

function renderMathHuntGrid() {
    const gridElement = document.getElementById('math-hunt-grid');
    gridElement.innerHTML = '';
    
    mathHuntGrid.forEach((number, index) => {
        const button = document.createElement('button');
        button.className = 'math-hunt-grid-item';
        button.textContent = number;
        button.onclick = () => selectMathHuntNumber(index);
        gridElement.appendChild(button);
    });
}

function selectMathHuntNumber(index) {
    if (!mathHuntGameActive) return;
    
    const button = document.querySelectorAll('.math-hunt-grid-item')[index];
    
    if (mathHuntSelectedNumbers.length < 2 && !mathHuntSelectedNumbers.includes(index)) {
        mathHuntSelectedNumbers.push(index);
        button.classList.add('selected');
        
        if (mathHuntSelectedNumbers.length === 2) {
            checkMathHuntAnswer();
        }
    }
}

function checkMathHuntAnswer() {
    const num1 = mathHuntGrid[mathHuntSelectedNumbers[0]];
    const num2 = mathHuntGrid[mathHuntSelectedNumbers[1]];
    const product = num1 * num2;
    
    const messageElement = document.getElementById('math-hunt-message');
    
    if (product === mathHuntTargetNumber) {
        messageElement.textContent = 'Correct! 🎉';
        messageElement.className = 'math-hunt-message correct';
        mathHuntScore++;
        document.getElementById('math-hunt-score').textContent = mathHuntScore;
        
        setTimeout(() => {
            newMathHuntRound();
        }, 1500);
    } else {
        messageElement.textContent = 'Try again! 🤔';
        messageElement.className = 'math-hunt-message incorrect';
        
        setTimeout(() => {
            clearMathHuntSelection();
            messageElement.textContent = 'Find two numbers that multiply to make the target!';
            messageElement.className = 'math-hunt-message';
        }, 1500);
    }
}

function clearMathHuntSelection() {
    mathHuntSelectedNumbers = [];
    document.querySelectorAll('.math-hunt-grid-item').forEach(button => {
        button.classList.remove('selected');
    });
}

function newMathHuntRound() {
    clearMathHuntSelection();
    createMathHuntGrid();
    selectRandomPair();
    renderMathHuntGrid();
    
    const messageElement = document.getElementById('math-hunt-message');
    messageElement.textContent = 'Find two numbers that multiply to make the target!';
    messageElement.className = 'math-hunt-message';
}

function startMathHuntTimer() {
    const timerElement = document.getElementById('math-hunt-timer');
    
    mathHuntGameTimer = setInterval(() => {
        mathHuntTimeLeft--;
        timerElement.textContent = mathHuntTimeLeft;
        
        // Add warning class when time is low
        const timerContainer = document.querySelector('.math-hunt-timer');
        if (mathHuntTimeLeft <= 10) {
            timerContainer.classList.add('warning');
        }
        
        if (mathHuntTimeLeft <= 0) {
            endMathHuntGame();
        }
    }, 1000);
}

function endMathHuntGame() {
    mathHuntGameActive = false;
    clearInterval(mathHuntGameTimer);
    
    document.getElementById('math-hunt-final-score').textContent = mathHuntScore;
    document.getElementById('math-hunt-game-over').style.display = 'block';
    
    // Disable all grid buttons
    document.querySelectorAll('.math-hunt-grid-item').forEach(button => {
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.5';
    });
}

function startNewMathHuntGame() {
    mathHuntGameActive = true;
    mathHuntScore = 0;
    mathHuntTimeLeft = 90;
    mathHuntSelectedNumbers = [];
    
    document.getElementById('math-hunt-score').textContent = mathHuntScore;
    document.getElementById('math-hunt-timer').textContent = mathHuntTimeLeft;
    document.querySelector('.math-hunt-timer').classList.remove('warning');
    document.getElementById('math-hunt-game-over').style.display = 'none';
    
    newMathHuntRound();
    startMathHuntTimer();
}

// Initialize game when the Math Hunt section is shown
function initMathHuntGame() {
    if (document.getElementById('math-hunt-grid').children.length === 0) {
        startNewMathHuntGame();
    }
}

// Navigation function for back button
function navigateBack() {
    if (typeof navigateToRoute === 'function') {
        navigateToRoute('/other');
    } else {
        window.history.back();
    }
}

// Auto-start when navigating to math hunt
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the math-hunt page initially
    if (window.location.pathname === '/math-hunt' || window.location.hash === '#math-hunt') {
        initMathHuntGame();
    }
}); 