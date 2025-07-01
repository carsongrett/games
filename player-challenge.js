// NFL Player Challenge Game Implementation
class PlayerChallengeGame {
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
            console.log('Starting to load NFL players...'); // Debug log
            const response = await fetch('nfl_players.csv');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            console.log('CSV loaded, first 200 chars:', csvText.substring(0, 200)); // Debug log
            
            // Skip header row and parse CSV
            const rows = csvText.split('\n').slice(1);
            console.log('Total rows after header:', rows.length); // Debug log
            
            this.players = rows.map(row => {
                const columns = row.split(',');
                // Skip rows that don't have enough data
                if (columns.length < 8 || !columns[0].trim()) return null;
                
                return {
                    name: columns[0].trim(),
                    conference: columns[1].trim(),
                    team: columns[2].trim(),
                    position: columns[3].trim(),
                    receptions: parseInt(columns[4]) || 0,
                    receivingYards: parseInt(columns[5]) || 0,
                    rushingYards: parseInt(columns[6]) || 0,
                    totalTDs: parseInt(columns[7]) || 0
                };
            }).filter(player => player && player.name); // Filter out null and empty rows
            
            console.log('Loaded players:', this.players.length); // Debug log
            if (this.players.length > 0) {
                console.log('First player:', this.players[0]); // Debug log
            }
        } catch (error) {
            console.error('Error loading NFL players:', error);
            this.showMessage('player-message', 'Error loading player data. Please refresh the page.', 'error', 0);
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
        
        this.hideMessage('player-message');
        
        console.log('Target player:', this.targetPlayer.name); // For testing
    }
    
    setupAutocomplete() {
        const dropdown = document.getElementById('player-dropdown');
        const datalist = document.getElementById('nfl-players-list');
        
        if (!dropdown || !datalist) {
            console.error('Dropdown elements not found');
            return;
        }
        
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
        
        console.log('Added options to datalist:', datalist.options.length); // Debug log
        
        // Remove any existing event listeners
        const newDropdown = dropdown.cloneNode(true);
        dropdown.parentNode.replaceChild(newDropdown, dropdown);
        
        // Add fresh event listener
        newDropdown.addEventListener('input', (event) => {
            const submitBtn = document.getElementById('submit-guess-btn');
            const inputValue = event.target.value;
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === inputValue);
            
            if (submitBtn) {
                submitBtn.disabled = !selectedOption;
            }
            
            console.log('Input changed:', inputValue, 'Found option:', !!selectedOption); // Debug log
        });
        
        // Also listen for change events (when user selects from dropdown)
        newDropdown.addEventListener('change', (event) => {
            const submitBtn = document.getElementById('submit-guess-btn');
            const inputValue = event.target.value;
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === inputValue);
            
            if (submitBtn) {
                submitBtn.disabled = !selectedOption;
            }
            
            console.log('Selection changed:', inputValue, 'Found option:', !!selectedOption); // Debug log
        });
    }
    
    submitPlayerGuess() {
        if (this.gameOver) return;
        
        const dropdown = document.getElementById('player-dropdown');
        const datalist = document.getElementById('nfl-players-list');
        
        if (!dropdown || !datalist) {
            console.error('Dropdown elements not found in submit');
            return;
        }
        
        const selectedOption = Array.from(datalist.options).find(opt => opt.value === dropdown.value);
        
        if (!selectedOption) {
            this.showMessage('player-message', 'Please select a valid player from the list!', 'error', 2000);
            return;
        }
        
        let guessedPlayer;
        try {
            guessedPlayer = JSON.parse(selectedOption.getAttribute('data-player'));
        } catch (error) {
            console.error('Error parsing player data:', error);
            this.showMessage('player-message', 'Error processing player selection!', 'error', 2000);
            return;
        }
        
        // Check if already guessed
        if (this.guesses.some(guess => guess.name === guessedPlayer.name)) {
            this.showMessage('player-message', 'You already guessed this player!', 'error', 2000);
            return;
        }
        
        // Add guess
        this.guesses.push(guessedPlayer);
        this.addGuessToGrid(guessedPlayer);
        
        // Check win condition
        if (guessedPlayer.name === this.targetPlayer.name) {
            this.gameWon = true;
            this.gameOver = true;
            this.showMessage('player-message', `🎉 Congratulations! You found ${this.targetPlayer.name} in ${this.guesses.length} guess${this.guesses.length === 1 ? '' : 'es'}!`, 'success', 0);
        } else if (this.guesses.length >= this.maxGuesses) {
            this.gameOver = true;
            this.showMessage('player-message', `Game Over! The player was ${this.targetPlayer.name} (${this.targetPlayer.team}) - ${this.targetPlayer.position}`, 'error', 0);
        }
        
        // Reset dropdown
        dropdown.value = '';
        const submitBtn = document.getElementById('submit-guess-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        this.updateDisplay();
    }
    
    addGuessToGrid(guessedPlayer) {
        const grid = document.getElementById('player-grid');
        
        // Create row data with the 8 columns from the CSV structure
        const rowData = [
            { value: guessedPlayer.conference, type: 'conference' },
            { value: guessedPlayer.team, type: 'team' },
            { value: guessedPlayer.position, type: 'position' },
            { value: guessedPlayer.receptions.toString(), type: 'receptions' },
            { value: guessedPlayer.receivingYards.toString(), type: 'receivingYards' },
            { value: guessedPlayer.rushingYards.toString(), type: 'rushingYards' },
            { value: guessedPlayer.totalTDs.toString(), type: 'totalTDs' }
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
        
        // Add to previous guesses list
        this.addToPreviousGuesses(guessedPlayer);
    }
    
    addToPreviousGuesses(guessedPlayer) {
        const previousGuessesList = document.getElementById('previous-guesses-list');
        if (!previousGuessesList) return;
        
        const guessItem = document.createElement('div');
        guessItem.className = 'previous-guess-item';
        
        // Determine overall guess status (if any stat is correct, it's "close")
        const hasCorrect = ['conference', 'team', 'position'].some(type => 
            this.getColorClass(type, guessedPlayer) === 'correct'
        );
        const hasClose = ['receptions', 'receivingYards', 'rushingYards', 'totalTDs'].some(type => 
            this.getColorClass(type, guessedPlayer) === 'close'
        );
        
        if (hasCorrect) {
            guessItem.classList.add('correct');
        } else if (hasClose) {
            guessItem.classList.add('close');
        } else {
            guessItem.classList.add('incorrect');
        }
        
        guessItem.innerHTML = `
            <div class="previous-guess-name">${guessedPlayer.name}</div>
            <div class="previous-guess-details">
                <span class="previous-guess-team">${guessedPlayer.team}</span>
                <span class="previous-guess-position">${guessedPlayer.position}</span>
            </div>
        `;
        
        // Add to the beginning of the list (most recent first)
        previousGuessesList.insertBefore(guessItem, previousGuessesList.firstChild);
    }
    
    getColorClass(type, guessedPlayer) {
        const getStatComparison = (stat, threshold) => {
            if (guessedPlayer[stat] === this.targetPlayer[stat]) return 'correct';
            const diff = Math.abs(guessedPlayer[stat] - this.targetPlayer[stat]);
            return diff <= threshold ? 'close' : 'incorrect';
        };

        switch (type) {
            case 'conference':
                return guessedPlayer.conference === this.targetPlayer.conference ? 'correct' : 'incorrect';
            case 'team':
                return guessedPlayer.team === this.targetPlayer.team ? 'correct' : 'incorrect';
            case 'position':
                return guessedPlayer.position === this.targetPlayer.position ? 'correct' : 'incorrect';
            case 'receptions':
                return getStatComparison('receptions', 10); // Within 10 receptions
            case 'receivingYards':
                return getStatComparison('receivingYards', 100); // Within 100 yards
            case 'rushingYards':
                return getStatComparison('rushingYards', 100); // Within 100 yards
            case 'totalTDs':
                return getStatComparison('totalTDs', 3); // Within 3 TDs
            default:
                return '';
        }
    }
    
    clearGrid() {
        const grid = document.getElementById('player-grid');
        if (grid) {
            grid.innerHTML = '';
        }
        
        // Clear previous guesses list
        const previousGuessesList = document.getElementById('previous-guesses-list');
        if (previousGuessesList) {
            previousGuessesList.innerHTML = '';
        }
    }
    
    updateDisplay() {
        const guessesElement = document.getElementById('player-guesses');
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
async function initializePlayerChallenge() {
    window.nflGame = new PlayerChallengeGame();
    await window.nflGame.initialize();
}

// New game function
async function newPlayerGame() {
    await window.nflGame.initialize();
}

function submitPlayerGuess() {
    if (window.nflGame) {
        window.nflGame.submitPlayerGuess();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializePlayerChallenge); 