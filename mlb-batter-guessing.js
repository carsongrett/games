// MLB Batter Guessing Game
class MLBBatterGame {
    constructor() {
        this.batters = [];
        this.currentPlayer = null;
        this.currentRound = 1;
        this.maxRounds = 5;
        this.guessesRemaining = 4;
        this.maxGuesses = 4;
        this.totalCorrect = 0;
        this.gameOver = false;
        this.roundComplete = false;
    }

    async initialize() {
        await this.loadBatterData();
        this.startNewGame();
    }

    async loadBatterData() {
        try {
            const response = await fetch('mlb_batter_L7_07.01.2025.csv');
            const csvText = await response.text();
            
            const lines = csvText.split('\n');
            const headers = lines[0].split(',');
            
            this.batters = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    const values = this.parseCSVLine(line);
                    if (values.length >= headers.length) {
                        const batter = {};
                        headers.forEach((header, index) => {
                            batter[header.trim()] = values[index];
                        });
                        
                        // Only include batters with meaningful stats
                        if (parseFloat(batter.BA) > 0 && parseInt(batter.G) > 0) {
                            this.batters.push(batter);
                        }
                    }
                }
            }
            
            console.log(`Loaded ${this.batters.length} batters`);
        } catch (error) {
            console.error('Error loading batter data:', error);
            this.showMessage('Error loading game data. Please try again.', 'error');
        }
    }

    parseCSVLine(line) {
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        
        values.push(currentValue.trim());
        return values;
    }

    startNewGame() {
        this.currentRound = 1;
        this.totalCorrect = 0;
        this.gameOver = false;
        this.startNewRound();
        this.updateDisplay();
        this.showMessage('New game started! Can you guess the MLB batter from their recent stats?', 'info');
    }

    startNewRound() {
        this.roundComplete = false;
        this.guessesRemaining = this.maxGuesses;
        this.selectRandomPlayer();
        this.updateDisplay();
        this.enableInput();
        
        // Clear previous guess input
        const guessInput = document.getElementById('mlb-batter-guess-input');
        if (guessInput) {
            guessInput.value = '';
        }
    }

    selectRandomPlayer() {
        if (this.batters.length === 0) {
            this.showMessage('No batter data available', 'error');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * this.batters.length);
        this.currentPlayer = this.batters[randomIndex];
        
        // Display the stats without revealing the player
        this.displayPlayerStats();
    }

    displayPlayerStats() {
        if (!this.currentPlayer) return;
        
        const statsDisplay = document.getElementById('mlb-batter-stats-display');
        if (statsDisplay) {
            const doubles = this.currentPlayer['2B'] || '0';
            const triples = this.currentPlayer['3B'] || '0';
            const homeRuns = this.currentPlayer.HR || '0';
            const rbi = this.currentPlayer.RBI || '0';
            const battingAvg = parseFloat(this.currentPlayer.BA || 0).toFixed(3);
            const games = this.currentPlayer.G || '0';
            
            // Determine what hints to show based on guesses made
            let teamHint = '';
            let nameHint = '';
            const guessesMade = this.maxGuesses - this.guessesRemaining;
            
            if (guessesMade >= 1) {
                // After 1st incorrect guess: show team name
                teamHint = this.currentPlayer.Tm || 'Unknown';
            } else {
                teamHint = '<span class="team-hidden">[Team Hidden]</span>';
            }
            
            if (guessesMade >= 3) {
                // After 3rd incorrect guess: show first letter of first name
                const firstName = this.currentPlayer.Name.split(' ')[0];
                const firstLetter = firstName.charAt(0).toUpperCase();
                nameHint = `<br><strong>Hint:</strong> First name starts with "${firstLetter}"`;
            }
            
            statsDisplay.innerHTML = `
                <p>A player from <strong>${teamHint}</strong> had these stats over the last week:${nameHint}</p>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${doubles}</span>
                        <span class="stat-label">Doubles (2B)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${triples}</span>
                        <span class="stat-label">Triples (3B)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${homeRuns}</span>
                        <span class="stat-label">Home Runs (HR)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${rbi}</span>
                        <span class="stat-label">RBI</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${battingAvg}</span>
                        <span class="stat-label">Batting Average</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${games}</span>
                        <span class="stat-label">Games Played</span>
                    </div>
                </div>
            `;
        }
    }

    submitGuess() {
        if (this.roundComplete || this.gameOver) return;
        
        const guessInput = document.getElementById('mlb-batter-guess-input');
        const guess = guessInput.value.trim();
        
        if (!guess) {
            this.showMessage('Please enter a player name!', 'error');
            return;
        }
        
        this.guessesRemaining--;
        
        // Check if guess is correct (case insensitive)
        const isCorrect = this.isGuessCorrect(guess, this.currentPlayer.Name);
        
        if (isCorrect) {
            this.handleCorrectGuess();
        } else {
            this.handleIncorrectGuess();
        }
        
        this.updateDisplay();
        guessInput.value = '';
    }

    isGuessCorrect(guess, actualName) {
        // Normalize both strings for comparison
        const normalizeString = (str) => {
            return str.toLowerCase()
                      .replace(/[^a-z\s]/g, '') // Remove special characters
                      .replace(/\s+/g, ' ') // Normalize spaces
                      .trim();
        };
        
        const normalizedGuess = normalizeString(guess);
        const normalizedName = normalizeString(actualName);
        
        // Check exact match
        if (normalizedGuess === normalizedName) return true;
        
        // Check if guess contains both first and last name parts
        const guessParts = normalizedGuess.split(' ');
        const nameParts = normalizedName.split(' ');
        
        if (guessParts.length >= 2 && nameParts.length >= 2) {
            const firstNameMatch = guessParts.some(part => nameParts[0].includes(part) || part.includes(nameParts[0]));
            const lastNameMatch = guessParts.some(part => nameParts[nameParts.length - 1].includes(part) || part.includes(nameParts[nameParts.length - 1]));
            return firstNameMatch && lastNameMatch;
        }
        
        return false;
    }

    handleCorrectGuess() {
        this.totalCorrect++;
        this.roundComplete = true;
        this.showPlayerReveal(true);
        this.disableInput();
        
        const guessesMade = this.maxGuesses - this.guessesRemaining;
        const pointsEarned = this.maxGuesses - guessesMade;
        this.showMessage(`Correct! That was ${this.currentPlayer.Name} from the ${this.currentPlayer.Tm}! (+${pointsEarned} points)`, 'success');
    }

    handleIncorrectGuess() {
        if (this.guessesRemaining <= 0) {
            this.roundComplete = true;
            this.showPlayerReveal(false);
            this.disableInput();
            this.showMessage(`Incorrect! The player was ${this.currentPlayer.Name} from the ${this.currentPlayer.Tm}.`, 'error');
        } else {
            // Update display to show new hints after incorrect guess
            this.displayPlayerStats();
            
            let message = `Incorrect! ${this.guessesRemaining} guess${this.guessesRemaining === 1 ? '' : 'es'} remaining.`;
            
            // Add hint messages
            const guessesMade = this.maxGuesses - this.guessesRemaining;
            if (guessesMade === 1) {
                message += ` Team revealed!`;
            } else if (guessesMade === 3) {
                message += ` First letter hint added!`;
            }
            
            this.showMessage(message, 'error');
        }
    }

    showPlayerReveal(wasCorrect) {
        const statsDisplay = document.getElementById('mlb-batter-stats-display');
        if (statsDisplay && this.currentPlayer) {
            const doubles = this.currentPlayer['2B'] || '0';
            const triples = this.currentPlayer['3B'] || '0';
            const homeRuns = this.currentPlayer.HR || '0';
            const rbi = this.currentPlayer.RBI || '0';
            const battingAvg = parseFloat(this.currentPlayer.BA || 0).toFixed(3);
            const games = this.currentPlayer.G || '0';
            
            const resultClass = wasCorrect ? 'correct-reveal' : 'incorrect-reveal';
            
            statsDisplay.innerHTML = `
                <div class="player-reveal ${resultClass}">
                    <h3>${this.currentPlayer.Name} - ${this.currentPlayer.Tm}</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">${doubles}</span>
                            <span class="stat-label">Doubles (2B)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${triples}</span>
                            <span class="stat-label">Triples (3B)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${homeRuns}</span>
                            <span class="stat-label">Home Runs (HR)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${rbi}</span>
                            <span class="stat-label">RBI</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${battingAvg}</span>
                            <span class="stat-label">Batting Average</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${games}</span>
                            <span class="stat-label">Games Played</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    nextRound() {
        if (this.currentRound >= this.maxRounds) {
            this.endGame();
        } else {
            this.currentRound++;
            this.startNewRound();
        }
    }

    endGame() {
        this.gameOver = true;
        this.disableInput();
        
        const percentage = Math.round((this.totalCorrect / this.maxRounds) * 100);
        let finalMessage = `Game Complete! You guessed ${this.totalCorrect} out of ${this.maxRounds} batters correctly (${percentage}%).`;
        
        if (percentage >= 80) {
            finalMessage += ' Outstanding MLB knowledge! ⚾🏆';
        } else if (percentage >= 60) {
            finalMessage += ' Great job! You know your baseball! ⚾';
        } else if (percentage >= 40) {
            finalMessage += ' Not bad! Keep following the game! ⚾';
        } else {
            finalMessage += ' Keep watching and learning! ⚾';
        }
        
        this.showMessage(finalMessage, 'info');
        this.updateDisplay();
    }

    updateDisplay() {
        // Update round counter
        const roundDisplay = document.getElementById('mlb-batter-round');
        if (roundDisplay) {
            roundDisplay.textContent = `${this.currentRound}`;
        }
        
        // Update guesses remaining
        const guessesDisplay = document.getElementById('mlb-batter-guesses');
        if (guessesDisplay) {
            guessesDisplay.textContent = `${this.guessesRemaining}`;
        }
        
        // Update total correct
        const scoreDisplay = document.getElementById('mlb-batter-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = `${this.totalCorrect}`;
        }
        
        // Update next round button
        const nextRoundBtn = document.getElementById('mlb-batter-next-round');
        if (nextRoundBtn) {
            if (this.roundComplete && !this.gameOver) {
                nextRoundBtn.style.display = 'inline-block';
                nextRoundBtn.textContent = this.currentRound >= this.maxRounds ? 'View Final Results' : 'Next Round';
            } else {
                nextRoundBtn.style.display = 'none';
            }
        }
        
        // Update play again button
        const playAgainBtn = document.getElementById('mlb-batter-play-again');
        if (playAgainBtn) {
            playAgainBtn.style.display = this.gameOver ? 'inline-block' : 'none';
        }
        
        // Update new game button
        const newGameBtn = document.getElementById('mlb-batter-new-game');
        if (newGameBtn) {
            newGameBtn.style.display = this.gameOver ? 'none' : 'inline-block';
        }
    }

    enableInput() {
        const guessInput = document.getElementById('mlb-batter-guess-input');
        const submitBtn = document.getElementById('mlb-batter-submit');
        
        if (guessInput) {
            guessInput.disabled = false;
            guessInput.focus();
        }
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }

    disableInput() {
        const guessInput = document.getElementById('mlb-batter-guess-input');
        const submitBtn = document.getElementById('mlb-batter-submit');
        
        if (guessInput) guessInput.disabled = true;
        if (submitBtn) submitBtn.disabled = true;
    }

    showMessage(message, type) {
        const messageElement = document.getElementById('mlb-batter-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `game-message ${type}`;
            messageElement.style.display = 'block';
            
            if (type !== 'error' && !this.gameOver) {
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 4000);
            }
        }
    }
}

// Global game instance
let mlbBatterGame = null;

// Initialize game when section is opened
async function initializeMLBBatterGame() {
    if (!mlbBatterGame) {
        mlbBatterGame = new MLBBatterGame();
        await mlbBatterGame.initialize();
    }
}

// Game functions
function submitMLBBatterGuess() {
    if (mlbBatterGame) {
        mlbBatterGame.submitGuess();
    }
}

function nextMLBBatterRound() {
    if (mlbBatterGame) {
        mlbBatterGame.nextRound();
    }
}

function newMLBBatterGame() {
    if (mlbBatterGame) {
        mlbBatterGame.startNewGame();
    }
}

// Handle Enter key in input field
document.addEventListener('DOMContentLoaded', function() {
    const guessInput = document.getElementById('mlb-batter-guess-input');
    if (guessInput) {
        guessInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                submitMLBBatterGuess();
            }
        });
    }
});

// Auto-initialize if page loads directly to mlb batter game
if (window.location.pathname === '/mlb-batter-guessing' || window.location.hash === '#mlb-batter-guessing') {
    document.addEventListener('DOMContentLoaded', initializeMLBBatterGame);
}
