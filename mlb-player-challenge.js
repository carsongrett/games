// MLB Team Challenge Game Implementation
class MLBTeamChallengeGame {
    constructor() {
        this.teams = [];
        this.targetTeam = null;
        this.guesses = [];
        this.maxGuesses = 6;
        this.gameOver = false;
        this.gameWon = false;
    }

    async loadTeams() {
        try {
            console.log('Starting to load MLB teams...'); // Debug log
            const response = await fetch('mlb_team_stats_06292025.csv');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            console.log('CSV loaded, first 200 chars:', csvText.substring(0, 200)); // Debug log
            
            // Skip header row and parse CSV
            const rows = csvText.split('\n').slice(1);
            console.log('Total rows after header:', rows.length); // Debug log
            
            this.teams = rows.map(row => {
                const columns = row.split(',');
                // Skip rows that don't have enough data
                if (columns.length < 7 || !columns[0].trim()) return null;
                
                return {
                    name: columns[0].trim(),
                    league: columns[1].trim(),
                    division: columns[2].trim(),
                    runsPerGame: parseFloat(columns[3]) || 0,
                    homeRuns: parseInt(columns[4]) || 0,
                    stolenBases: parseInt(columns[5]) || 0,
                    battingAvg: parseFloat(columns[6]) || 0
                };
            }).filter(team => team && team.name); // Filter out null and empty rows
            
            console.log('Loaded teams:', this.teams.length); // Debug log
            if (this.teams.length > 0) {
                console.log('First team:', this.teams[0]); // Debug log
            }
        } catch (error) {
            console.error('Error loading MLB teams:', error);
            this.showMessage('mlb-player-message', 'Error loading team data. Please refresh the page.', 'error', 0);
        }
    }

    async initialize() {
        await this.loadTeams();
        this.targetTeam = this.teams[Math.floor(Math.random() * this.teams.length)];
        this.guesses = [];
        this.gameOver = false;
        this.gameWon = false;
        
        this.setupAutocomplete();
        this.updateDisplay();
        this.clearGrid();
        
        this.hideMessage('mlb-player-message');
        
        console.log('Target team:', this.targetTeam.name); // For testing
    }
    
    setupAutocomplete() {
        const dropdown = document.getElementById('mlb-player-dropdown');
        const datalist = document.getElementById('mlb-players-list');
        
        if (!dropdown || !datalist) {
            console.error('Dropdown elements not found');
            return;
        }
        
        // Clear existing options
        dropdown.value = '';
        datalist.innerHTML = '';
        
        // Sort teams alphabetically
        const sortedTeams = [...this.teams].sort((a, b) => a.name.localeCompare(b.name));
        
        // Populate datalist with options
        sortedTeams.forEach(team => {
            const option = document.createElement('option');
            option.value = team.name;
            option.setAttribute('data-team', JSON.stringify(team));
            datalist.appendChild(option);
        });
        
        console.log('Added options to datalist:', datalist.options.length); // Debug log
        
        // Remove any existing event listeners
        const newDropdown = dropdown.cloneNode(true);
        dropdown.parentNode.replaceChild(newDropdown, dropdown);
        
        // Add fresh event listener
        newDropdown.addEventListener('input', (event) => {
            const submitBtn = document.getElementById('submit-mlb-guess-btn');
            const inputValue = event.target.value;
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === inputValue);
            
            if (submitBtn) {
                submitBtn.disabled = !selectedOption;
            }
            
            console.log('Input changed:', inputValue, 'Found option:', !!selectedOption); // Debug log
        });
        
        // Also listen for change events (when user selects from dropdown)
        newDropdown.addEventListener('change', (event) => {
            const submitBtn = document.getElementById('submit-mlb-guess-btn');
            const inputValue = event.target.value;
            const selectedOption = Array.from(datalist.options).find(opt => opt.value === inputValue);
            
            if (submitBtn) {
                submitBtn.disabled = !selectedOption;
            }
            
            console.log('Selection changed:', inputValue, 'Found option:', !!selectedOption); // Debug log
        });
    }
    
    submitTeamGuess() {
        if (this.gameOver) return;
        
        const dropdown = document.getElementById('mlb-player-dropdown');
        const datalist = document.getElementById('mlb-players-list');
        
        if (!dropdown || !datalist) {
            console.error('Dropdown elements not found in submit');
            return;
        }
        
        const selectedOption = Array.from(datalist.options).find(opt => opt.value === dropdown.value);
        
        if (!selectedOption) {
            this.showMessage('mlb-player-message', 'Please select a valid team from the list!', 'error', 2000);
            return;
        }
        
        let guessedTeam;
        try {
            guessedTeam = JSON.parse(selectedOption.getAttribute('data-team'));
        } catch (error) {
            console.error('Error parsing team data:', error);
            this.showMessage('mlb-player-message', 'Error processing team selection!', 'error', 2000);
            return;
        }
        
        // Check if already guessed
        if (this.guesses.some(guess => guess.name === guessedTeam.name)) {
            this.showMessage('mlb-player-message', 'You already guessed this team!', 'error', 2000);
            return;
        }
        
        // Add guess
        this.guesses.push(guessedTeam);
        this.addGuessToGrid(guessedTeam);
        
        // Check win condition
        if (guessedTeam.name === this.targetTeam.name) {
            this.gameWon = true;
            this.gameOver = true;
            this.showMessage('mlb-player-message', `🎉 Congratulations! You found ${this.targetTeam.name} in ${this.guesses.length} guess${this.guesses.length === 1 ? '' : 'es'}!`, 'success', 0);
        } else if (this.guesses.length >= this.maxGuesses) {
            this.gameOver = true;
            this.showMessage('mlb-player-message', `Game Over! The team was ${this.targetTeam.name} (${this.targetTeam.league} ${this.targetTeam.division})`, 'error', 0);
        }
        
        // Reset dropdown
        dropdown.value = '';
        const submitBtn = document.getElementById('submit-mlb-guess-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        this.updateDisplay();
    }
    
    isMobile() {
        return window.innerWidth <= 768;
    }

    addGuessToGrid(guessedTeam) {
        const grid = document.getElementById('mlb-player-grid');
        
        if (this.isMobile()) {
            this.addGuessToMobileGrid(guessedTeam);
        } else {
            this.addGuessToDesktopGrid(guessedTeam);
        }
    }

    addGuessToDesktopGrid(guessedTeam) {
        const grid = document.getElementById('mlb-player-grid');
        
        // Create row data with the 6 columns from the MLB team stats CSV
        const rowData = [
            { value: guessedTeam.league, type: 'league' },
            { value: guessedTeam.division, type: 'division' },
            { value: guessedTeam.runsPerGame.toFixed(2), type: 'runsPerGame' },
            { value: guessedTeam.homeRuns.toString(), type: 'homeRuns' },
            { value: guessedTeam.stolenBases.toString(), type: 'stolenBases' },
            { value: guessedTeam.battingAvg.toFixed(3), type: 'battingAvg' }
        ];
        
        const row = document.createElement('div');
        row.className = 'player-row';
        
        rowData.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = `grid-cell ${this.getColorClass(cell.type, guessedTeam)}`;
            cellElement.textContent = cell.value;
            row.appendChild(cellElement);
        });
        
        grid.appendChild(row);
    }

    addGuessToMobileGrid(guessedTeam) {
        const grid = document.getElementById('mlb-player-grid');
        
        // Create mobile grid if it doesn't exist or is empty
        if (!grid.hasChildNodes() || !grid.classList.contains('mobile-grid-structure')) {
            this.createMobileGridStructure();
        }
        
        // Add this guess as a new column
        const rowData = [
            { value: guessedTeam.league, type: 'league' },
            { value: guessedTeam.division, type: 'division' },
            { value: guessedTeam.runsPerGame.toFixed(2), type: 'runsPerGame' },
            { value: guessedTeam.homeRuns.toString(), type: 'homeRuns' },
            { value: guessedTeam.stolenBases.toString(), type: 'stolenBases' },
            { value: guessedTeam.battingAvg.toFixed(3), type: 'battingAvg' }
        ];

        // Add cells to each row
        rowData.forEach((cell, index) => {
            const row = grid.children[index];
            if (row) {
                const cellElement = document.createElement('div');
                const colorClass = this.getColorClass(cell.type, guessedTeam);
                cellElement.className = `mobile-guess-cell ${colorClass}`;
                cellElement.textContent = cell.value;
                
                // Apply base styles
                cellElement.style.minWidth = '80px';
                cellElement.style.maxWidth = '120px';
                cellElement.style.padding = '1rem 0.5rem';
                cellElement.style.fontSize = '1.1rem';
                cellElement.style.borderRadius = '8px';
                cellElement.style.fontWeight = '600';
                cellElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                cellElement.style.display = 'flex';
                cellElement.style.alignItems = 'center';
                cellElement.style.justifyContent = 'center';
                cellElement.style.textAlign = 'center';
                cellElement.style.flexShrink = '0';
                
                // Apply color styles based on correctness
                if (colorClass === 'correct') {
                    cellElement.style.backgroundColor = '#22c55e';
                    cellElement.style.color = 'white';
                } else if (colorClass === 'close') {
                    cellElement.style.backgroundColor = '#f59e0b';
                    cellElement.style.color = 'white';
                } else {
                    cellElement.style.backgroundColor = '#6b7280';
                    cellElement.style.color = 'white';
                }
                
                row.appendChild(cellElement);
            }
        });
    }

    createMobileGridStructure() {
        const grid = document.getElementById('mlb-player-grid');
        grid.innerHTML = '';
        grid.className = 'player-grid mobile-grid-structure';
        
        const categories = [
            'League',
            'Division', 
            'Runs/Game',
            'Home Runs',
            'Stolen Bases',
            'Batting Avg'
        ];
        
        categories.forEach(category => {
            const row = document.createElement('div');
            row.className = 'mobile-grid-row';
            
            const headerCell = document.createElement('div');
            headerCell.className = 'grid-cell mobile-category-header';
            headerCell.textContent = category;
            row.appendChild(headerCell);
            
            grid.appendChild(row);
        });
    }
    
    getColorClass(type, guessedTeam) {
        const getStatComparison = (stat, threshold) => {
            if (guessedTeam[stat] === this.targetTeam[stat]) return 'correct';
            return Math.abs(guessedTeam[stat] - this.targetTeam[stat]) <= threshold ? 'close' : 'incorrect';
        };
        
        switch (type) {
            case 'league':
                return guessedTeam.league === this.targetTeam.league ? 'correct' : 'incorrect';
            case 'division':
                return guessedTeam.division === this.targetTeam.division ? 'correct' : 'incorrect';
            case 'runsPerGame':
                return getStatComparison('runsPerGame', 0.5);
            case 'homeRuns':
                return getStatComparison('homeRuns', 10);
            case 'stolenBases':
                return getStatComparison('stolenBases', 10);
            case 'battingAvg':
                return getStatComparison('battingAvg', 0.01);
            default:
                return '';
        }
    }
    
    clearGrid() {
        const grid = document.getElementById('mlb-player-grid');
        if (grid) {
            grid.innerHTML = '';
            if (this.isMobile()) {
                grid.className = 'player-grid';
            }
        }
    }
    
    updateDisplay() {
        document.getElementById('mlb-player-guesses').textContent = this.guesses.length;
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
        }
    }
}

// Initialize game
async function initializeMLBTeamChallenge() {
    window.mlbGame = new MLBTeamChallengeGame();
    await window.mlbGame.initialize();
}

// New game function
async function newMLBTeamGame() {
    await window.mlbGame.initialize();
}

function submitMLBTeamGuess() {
    if (window.mlbGame) {
        window.mlbGame.submitTeamGuess();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeMLBTeamChallenge); 