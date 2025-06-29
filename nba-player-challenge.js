// NBA Player Challenge Game Implementation
class NBAPlayerChallengeGame {
    constructor() {
        this.players = [];
        this.targetPlayer = null;
        this.guesses = [];
        this.maxGuesses = 8;
        this.gameOver = false;
        this.gameWon = false;
    }

    async loadPlayers() {
        try {
            const response = await fetch('nba_players.csv');
            const csvText = await response.text();
            
            // Skip header row and parse CSV
            const rows = csvText.split('\n').slice(1);
            this.players = rows.map(row => {
                const columns = row.split(',');
                // Skip rows that don't have enough data
                if (columns.length < 9 || !columns[0].trim()) return null;
                
                return {
                    name: columns[0].trim(),
                    age: parseInt(columns[1]),
                    team: columns[2].trim(),
                    position: columns[3].trim(),
                    fgPercent: parseFloat(columns[4]) || 0,
                    threePPercent: parseFloat(columns[5]) || 0,
                    rebounds: parseFloat(columns[6]) || 0,
                    assists: parseFloat(columns[7]) || 0,
                    points: parseFloat(columns[8]) || 0
                };
            }).filter(player => player && player.name); // Filter out null and empty rows
            
            console.log('Loaded players:', this.players.length); // Debug log
        } catch (error) {
            console.error('Error loading NBA players:', error);
        }
    }

    async initialize() {
        await this.loadPlayers();
        this.targetPlayer = this.players[Math.floor(Math.random() * this.players.length)];
        this.guesses = [];
        this.gameOver = false;
        this.gameWon = false;
        
        this.setupAutocomplete();
        this.updateDisplay();
        this.clearGrid();
        
        this.hideMessage('nba-player-message');
        
        console.log('Target player:', this.targetPlayer.name); // For testing
    }
    
    setupAutocomplete() {
        const dropdown = document.getElementById('nba-player-dropdown');
        const datalist = document.getElementById('nba-players-list');
        
        if (!dropdown || !datalist) {
            console.error('Dropdown elements not found');
            return;
        }
        
        // Clear existing options and event listeners
        dropdown.value = '';
        datalist.innerHTML = '';
        
        // Remove existing event listeners
        dropdown.removeEventListener('input', this.handleDropdownInput);
        
        // Sort players alphabetically
        const sortedPlayers = [...this.players].sort((a, b) => a.name.localeCompare(b.name));
        
        // Populate datalist with options
        sortedPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = `${player.name} (${player.team}) - ${player.position}`;
            option.setAttribute('data-player', JSON.stringify(player));
            datalist.appendChild(option);
        });
        
        console.log('Added options to datalist:', datalist.options.length); // Debug log
        
        // Setup input event listener
        this.handleDropdownInput = () => {
            const submitBtn = document.getElementById('submit-nba-guess-btn');
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === dropdown.value);
            if (submitBtn) {
                submitBtn.disabled = !selectedOption;
            }
        };
        
        dropdown.addEventListener('input', this.handleDropdownInput);
    }
    
    submitPlayerGuess() {
        if (this.gameOver) return;
        
        const dropdown = document.getElementById('nba-player-dropdown');
        const datalist = document.getElementById('nba-players-list');
        const selectedOption = Array.from(datalist.options).find(opt => opt.value === dropdown.value);
        
        if (!selectedOption) {
            this.showMessage('nba-player-message', 'Please select a valid player from the list!', 'error', 2000);
            return;
        }
        
        const guessedPlayer = JSON.parse(selectedOption.getAttribute('data-player'));
        
        // Check if already guessed
        if (this.guesses.some(guess => guess.name === guessedPlayer.name)) {
            this.showMessage('nba-player-message', 'You already guessed this player!', 'error', 2000);
            return;
        }
        
        // Add guess
        this.guesses.push(guessedPlayer);
        this.addGuessToGrid(guessedPlayer);
        
        // Check win condition
        if (guessedPlayer.name === this.targetPlayer.name) {
            this.gameWon = true;
            this.gameOver = true;
            this.showMessage('nba-player-message', `🎉 Congratulations! You found ${this.targetPlayer.name} in ${this.guesses.length} guess${this.guesses.length === 1 ? '' : 'es'}!`, 'success', 0);
        } else if (this.guesses.length >= this.maxGuesses) {
            this.gameOver = true;
            this.showMessage('nba-player-message', `Game Over! The player was ${this.targetPlayer.name} (${this.targetPlayer.team}) - ${this.targetPlayer.position}`, 'error', 0);
        }
        
        // Reset dropdown
        dropdown.value = '';
        const submitBtn = document.getElementById('submit-nba-guess-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        this.updateDisplay();
    }
    
    addGuessToGrid(guessedPlayer) {
        const grid = document.getElementById('nba-player-grid');
        
        // Create row data with statistics from CSV
        const rowData = [
            { value: guessedPlayer.team, type: 'team' },
            { value: guessedPlayer.position, type: 'position' },
            { value: guessedPlayer.points.toFixed(1), type: 'points' },
            { value: guessedPlayer.rebounds.toFixed(1), type: 'rebounds' },
            { value: guessedPlayer.assists.toFixed(1), type: 'assists' }
        ];
        
        const row = document.createElement('div');
        row.className = 'player-row';
        
        rowData.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = `grid-cell ${this.getColorClass(cell.type, guessedPlayer)}`;
            cellElement.textContent = cell.value;
            row.appendChild(cellElement);
        });
        
        grid.appendChild(row);
    }
    
    getColorClass(type, guessedPlayer) {
        const getStatComparison = (stat, threshold) => {
            if (guessedPlayer[stat] === this.targetPlayer[stat]) return 'correct';
            const diff = Math.abs(guessedPlayer[stat] - this.targetPlayer[stat]);
            return diff <= threshold ? 'close' : 'incorrect';
        };

        switch (type) {
            case 'team':
                return guessedPlayer.team === this.targetPlayer.team ? 'correct' : 'incorrect';
            case 'position':
                return guessedPlayer.position === this.targetPlayer.position ? 'correct' : 'incorrect';
            case 'points':
                return getStatComparison('points', 3);
            case 'rebounds':
                return getStatComparison('rebounds', 2);
            case 'assists':
                return getStatComparison('assists', 2);
            default:
                return '';
        }
    }
    
    clearGrid() {
        const grid = document.getElementById('nba-player-grid');
        if (grid) {
            grid.innerHTML = '';
        }
    }
    
    updateDisplay() {
        const guessesElement = document.getElementById('nba-player-guesses');
        if (guessesElement) {
            guessesElement.textContent = this.guesses.length;
        }
    }
    
    showMessage(elementId, message, type, duration) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `game-message ${type}`;
            messageElement.style.display = 'block';
            
            if (duration > 0) {
                setTimeout(() => {
                    this.hideMessage(elementId);
                }, duration);
            }
        }
    }
    
    hideMessage(elementId) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.style.display = 'none';
            messageElement.textContent = '';
            messageElement.className = 'game-message';
        }
    }
}

// Initialize game
async function initializeNBAPlayerChallenge() {
    window.nbaGame = new NBAPlayerChallengeGame();
    await window.nbaGame.initialize();
}

// New game function
async function newNBAPlayerGame() {
    await window.nbaGame.initialize();
}

function submitNBAPlayerGuess() {
    if (window.nbaGame) {
        window.nbaGame.submitPlayerGuess();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeNBAPlayerChallenge); 