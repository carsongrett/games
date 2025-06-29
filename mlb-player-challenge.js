// MLB Player Challenge Game Implementation
class MLBPlayerChallengeGame {
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
            const response = await fetch('mlb_players.csv');
            const csvText = await response.text();
            
            // Skip header row and parse CSV
            const rows = csvText.split('\n').slice(1);
            this.players = rows.map(row => {
                const [name, league, team, position, jerseyNumber, age] = row.split(',');
                return {
                    name: name.trim(),
                    league: league.trim(),
                    team: team.trim(),
                    position: position.trim(),
                    jerseyNumber: parseInt(jerseyNumber),
                    age: parseInt(age)
                };
            }).filter(player => player.name); // Filter out empty rows
        } catch (error) {
            console.error('Error loading MLB players:', error);
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
        
        hideMessage('mlb-player-message');
        
        console.log('Target player:', this.targetPlayer.name); // For testing
    }
    
    setupAutocomplete() {
        const dropdown = document.getElementById('mlb-player-dropdown');
        const datalist = document.getElementById('mlb-players-list');
        
        // Clear existing options
        dropdown.value = '';
        datalist.innerHTML = '';
        
        // Sort players alphabetically
        const sortedPlayers = [...this.players].sort((a, b) => a.name.localeCompare(b.name));
        
        // Populate datalist with options
        sortedPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = `${player.name} (${player.team}) - ${player.position}`;
            option.setAttribute('data-player', JSON.stringify(player));
            datalist.appendChild(option);
        });
        
        // Setup input event listeners
        dropdown.addEventListener('input', () => {
            const submitBtn = document.getElementById('submit-mlb-guess-btn');
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === dropdown.value);
            submitBtn.disabled = !selectedOption;
        });
    }
    
    submitPlayerGuess() {
        if (this.gameOver) return;
        
        const dropdown = document.getElementById('mlb-player-dropdown');
        const datalist = document.getElementById('mlb-players-list');
        const selectedOption = Array.from(datalist.options).find(opt => opt.value === dropdown.value);
        
        if (!selectedOption) return;
        
        const guessedPlayer = JSON.parse(selectedOption.getAttribute('data-player'));
        
        // Check if already guessed
        if (this.guesses.some(guess => guess.name === guessedPlayer.name)) {
            showMessage('mlb-player-message', 'You already guessed this player!', 'error', 2000);
            return;
        }
        
        // Add guess
        this.guesses.push(guessedPlayer);
        this.addGuessToGrid(guessedPlayer);
        
        // Check win condition
        if (guessedPlayer.name === this.targetPlayer.name) {
            this.gameWon = true;
            this.gameOver = true;
            showMessage('mlb-player-message', `🎉 Congratulations! You found ${this.targetPlayer.name} in ${this.guesses.length} guess${this.guesses.length === 1 ? '' : 'es'}!`, 'success', 0);
        } else if (this.guesses.length >= this.maxGuesses) {
            this.gameOver = true;
            showMessage('mlb-player-message', `Game Over! The player was ${this.targetPlayer.name} (${this.targetPlayer.team}) - ${this.targetPlayer.position}`, 'error', 0);
        }
        
        // Reset dropdown
        dropdown.value = '';
        document.getElementById('submit-mlb-guess-btn').disabled = true;
        
        this.updateDisplay();
    }
    
    addGuessToGrid(guessedPlayer) {
        const grid = document.getElementById('mlb-player-grid');
        
        // Create row data
        const rowData = [
            { value: guessedPlayer.league, type: 'league' },
            { value: guessedPlayer.team, type: 'team' },
            { value: guessedPlayer.position, type: 'position' },
            { value: guessedPlayer.jerseyNumber.toString(), type: 'jersey' },
            { value: guessedPlayer.age.toString(), type: 'age' }
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
        switch (type) {
            case 'league':
                return guessedPlayer.league === this.targetPlayer.league ? 'correct' : 'incorrect';
            case 'team':
                return guessedPlayer.team === this.targetPlayer.team ? 'correct' : 'incorrect';
            case 'position':
                return guessedPlayer.position === this.targetPlayer.position ? 'correct' : 'incorrect';
            case 'jersey':
                if (guessedPlayer.jerseyNumber === this.targetPlayer.jerseyNumber) return 'correct';
                return Math.abs(guessedPlayer.jerseyNumber - this.targetPlayer.jerseyNumber) <= 2 ? 'close' : 'incorrect';
            case 'age':
                if (guessedPlayer.age === this.targetPlayer.age) return 'correct';
                return Math.abs(guessedPlayer.age - this.targetPlayer.age) <= 2 ? 'close' : 'incorrect';
            default:
                return '';
        }
    }
    
    clearGrid() {
        const grid = document.getElementById('mlb-player-grid');
        grid.innerHTML = '';
    }
    
    updateDisplay() {
        document.getElementById('mlb-player-guesses').textContent = this.guesses.length;
    }
}

// Initialize game
async function initializeMLBPlayerChallenge() {
    window.mlbGame = new MLBPlayerChallengeGame();
    await window.mlbGame.initialize();
}

// New game function
async function newMLBPlayerGame() {
    await window.mlbGame.initialize();
}

function submitMLBPlayerGuess() {
    if (window.mlbGame) {
        window.mlbGame.submitPlayerGuess();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeMLBPlayerChallenge); 