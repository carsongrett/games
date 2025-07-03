// NFL Player Challenge Game Implementation
class NFLPlayerChallengeGame {
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
            console.log('Starting to load NFL players from embedded data...'); // Debug log
            
            // Embedded NFL player data (no external file needed)
            const nflPlayersData = [
                {name: "Saquon Barkley", conference: "NFC", team: "PHI", position: "RB", receivingYards: 278, rushingYards: 2005, totalTDs: 15},
                {name: "Derrick Henry", conference: "AFC", team: "BAL", position: "RB", receivingYards: 193, rushingYards: 1921, totalTDs: 18},
                {name: "Jahmyr Gibbs", conference: "NFC", team: "DET", position: "RB", receivingYards: 517, rushingYards: 1412, totalTDs: 20},
                {name: "Bijan Robinson", conference: "NFC", team: "ATL", position: "RB", receivingYards: 431, rushingYards: 1456, totalTDs: 15},
                {name: "Ja'Marr Chase", conference: "AFC", team: "CIN", position: "WR", receivingYards: 1708, rushingYards: 32, totalTDs: 17},
                {name: "Josh Jacobs", conference: "NFC", team: "GNB", position: "RB", receivingYards: 342, rushingYards: 1329, totalTDs: 16},
                {name: "Jonathan Taylor", conference: "AFC", team: "IND", position: "RB", receivingYards: 136, rushingYards: 1431, totalTDs: 12},
                {name: "Aaron Jones", conference: "NFC", team: "MIN", position: "RB", receivingYards: 408, rushingYards: 1138, totalTDs: 7},
                {name: "Justin Jefferson", conference: "NFC", team: "MIN", position: "WR", receivingYards: 1533, rushingYards: 3, totalTDs: 10},
                {name: "Bucky Irving", conference: "NFC", team: "TAM", position: "RB", receivingYards: 392, rushingYards: 1122, totalTDs: 8},
                {name: "James Conner", conference: "NFC", team: "ARI", position: "RB", receivingYards: 414, rushingYards: 1094, totalTDs: 9},
                {name: "De'Von Achane", conference: "AFC", team: "MIA", position: "RB", receivingYards: 592, rushingYards: 907, totalTDs: 12},
                {name: "Alvin Kamara", conference: "NFC", team: "NOR", position: "RB", receivingYards: 543, rushingYards: 950, totalTDs: 8},
                {name: "Kyren Williams", conference: "NFC", team: "LAR", position: "RB", receivingYards: 182, rushingYards: 1299, totalTDs: 16},
                {name: "Chuba Hubbard", conference: "NFC", team: "CAR", position: "RB", receivingYards: 171, rushingYards: 1195, totalTDs: 11},
                {name: "Breece Hall", conference: "AFC", team: "NYJ", position: "RB", receivingYards: 483, rushingYards: 876, totalTDs: 8},
                {name: "Chase Brown", conference: "AFC", team: "CIN", position: "RB", receivingYards: 360, rushingYards: 990, totalTDs: 11},
                {name: "D'Andre Swift", conference: "NFC", team: "CHI", position: "RB", receivingYards: 386, rushingYards: 959, totalTDs: 6},
                {name: "Brian Thomas", conference: "AFC", team: "JAX", position: "WR", receivingYards: 1282, rushingYards: 48, totalTDs: 10},
                {name: "Rico Dowdle", conference: "NFC", team: "DAL", position: "RB", receivingYards: 249, rushingYards: 1079, totalTDs: 5},
                {name: "Najee Harris", conference: "AFC", team: "PIT", position: "RB", receivingYards: 283, rushingYards: 1043, totalTDs: 6},
                {name: "Joe Mixon", conference: "AFC", team: "HOU", position: "RB", receivingYards: 309, rushingYards: 1016, totalTDs: 12},
                {name: "Tony Pollard", conference: "AFC", team: "TEN", position: "RB", receivingYards: 238, rushingYards: 1079, totalTDs: 5},
                {name: "Amon-Ra St. Brown", conference: "NFC", team: "DET", position: "WR", receivingYards: 1263, rushingYards: 6, totalTDs: 12},
                {name: "Drake London", conference: "NFC", team: "ATL", position: "WR", receivingYards: 1271, rushingYards: -3, totalTDs: 9},
                {name: "James Cook", conference: "AFC", team: "BUF", position: "RB", receivingYards: 258, rushingYards: 1009, totalTDs: 18},
                {name: "CeeDee Lamb", conference: "NFC", team: "DAL", position: "WR", receivingYards: 1194, rushingYards: 70, totalTDs: 6},
                {name: "Jerry Jeudy", conference: "AFC", team: "CLE", position: "WR", receivingYards: 1229, rushingYards: 0, totalTDs: 4},
                {name: "Brock Bowers", conference: "AFC", team: "LVR", position: "TE", receivingYards: 1194, rushingYards: 13, totalTDs: 5},
                {name: "Malik Nabers", conference: "NFC", team: "NYG", position: "WR", receivingYards: 1204, rushingYards: 2, totalTDs: 7},
                {name: "Jaxon Smith-Njigba", conference: "NFC", team: "SEA", position: "WR", receivingYards: 1130, rushingYards: 26, totalTDs: 6},
                {name: "Ladd McConkey", conference: "AFC", team: "LAC", position: "WR", receivingYards: 1149, rushingYards: 0, totalTDs: 7},
                {name: "Trey McBride", conference: "NFC", team: "ARI", position: "TE", receivingYards: 1146, rushingYards: 2, totalTDs: 3},
                {name: "Josh Allen", conference: "AFC", team: "BUF", position: "QB", receivingYards: 7, rushingYards: 531, totalTDs: 13},
                {name: "Lamar Jackson", conference: "AFC", team: "BAL", position: "QB", receivingYards: 0, rushingYards: 915, totalTDs: 4},
                {name: "Jayden Daniels", conference: "NFC", team: "WAS", position: "QB", receivingYards: 0, rushingYards: 891, totalTDs: 6},
                {name: "Travis Kelce", conference: "AFC", team: "KAN", position: "TE", receivingYards: 823, rushingYards: 1, totalTDs: 3},
                {name: "George Kittle", conference: "NFC", team: "SFO", position: "TE", receivingYards: 1106, rushingYards: 0, totalTDs: 8},
                {name: "Terry McLaurin", conference: "NFC", team: "WAS", position: "WR", receivingYards: 1096, rushingYards: 2, totalTDs: 13},
                {name: "Tyreek Hill", conference: "AFC", team: "MIA", position: "WR", receivingYards: 959, rushingYards: 53, totalTDs: 6},
                {name: "Davante Adams", conference: "AFC", team: "NYJ", position: "WR", receivingYards: 1063, rushingYards: 0, totalTDs: 8},
                {name: "A.J. Brown", conference: "NFC", team: "PHI", position: "WR", receivingYards: 1079, rushingYards: 0, totalTDs: 7},
                {name: "Cooper Kupp", conference: "NFC", team: "LAR", position: "WR", receivingYards: 710, rushingYards: 10, totalTDs: 6},
                {name: "Mike Evans", conference: "NFC", team: "TAM", position: "WR", receivingYards: 1004, rushingYards: 0, totalTDs: 11},
                {name: "DeVonta Smith", conference: "NFC", team: "PHI", position: "WR", receivingYards: 833, rushingYards: 1, totalTDs: 8},
                {name: "Courtland Sutton", conference: "AFC", team: "DEN", position: "WR", receivingYards: 1081, rushingYards: 0, totalTDs: 8}
            ];
            
            this.players = nflPlayersData;
            
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
    
    isMobile() {
        return window.innerWidth <= 768;
    }

    addGuessToGrid(guessedPlayer) {
        const grid = document.getElementById('player-grid');
        
        if (this.isMobile()) {
            this.replaceMobileGrid(guessedPlayer);
        } else {
            this.addGuessToDesktopGrid(guessedPlayer);
        }
    }

    addGuessToDesktopGrid(guessedPlayer) {
        const grid = document.getElementById('player-grid');
        
        // Create row data with the 6 columns from the new CSV structure
        const rowData = [
            { value: guessedPlayer.conference, type: 'conference' },
            { value: guessedPlayer.team, type: 'team' },
            { value: guessedPlayer.position, type: 'position' },
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
    }

    replaceMobileGrid(guessedPlayer) {
        const container = document.querySelector('#player-challenge .player-grid-container');
        
        // Completely replace the grid container content
        container.innerHTML = this.buildCompleteMobileGrid();
        
        // Auto-scroll to the far right to show the latest guess
        setTimeout(() => {
            const mobileWrapper = container.querySelector('.mobile-grid-wrapper');
            if (mobileWrapper) {
                // Force scroll to the maximum right position
                const maxScroll = mobileWrapper.scrollWidth - mobileWrapper.clientWidth;
                mobileWrapper.scrollTo({
                    left: maxScroll,
                    behavior: 'smooth'
                });
            }
        }, 100); // Increased delay to ensure DOM is fully rendered
    }

    buildCompleteMobileGrid() {
        const categories = ['Conference', 'Team', 'Position', 'Rec Yds', 'Rush Yds', 'Tot TDs'];
        
        let gridHTML = `
            <div class="mobile-grid-wrapper" style="
                width: 100%;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                position: relative;
            ">
                <div class="mobile-grid-content" style="
                    display: flex;
                    min-width: max-content;
                    position: relative;
                ">
                    <!-- Fixed left column for categories -->
                    <div class="mobile-categories-column" style="
                        position: sticky;
                        left: 0;
                        z-index: 10;
                        background-color: #1f2937;
                        box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                        flex-shrink: 0;
                    ">`;
        
        // Add category headers
        categories.forEach((category) => {
            gridHTML += `<div class="mobile-category" style="
                width: 100px; 
                height: 60px;
                padding: 1rem 0.8rem; 
                font-size: 1rem; 
                font-weight: 700; 
                background-color: #374151; 
                color: white; 
                border-radius: 8px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                text-align: center;
            ">${category}</div>`;
        });
        
        gridHTML += `</div>
                    <!-- Scrollable content area -->
                    <div class="mobile-guesses-container" style="
                        display: flex;
                        gap: 8px;
                        min-width: max-content;
                        padding-left: 8px;
                    ">`;
        
        // Add columns for each guess
        this.guesses.forEach((guess, guessIndex) => {
            gridHTML += `<div class="mobile-guess-column" style="
                display: flex;
                flex-direction: column;
                gap: 2px;
                min-width: 90px;
                flex-shrink: 0;
            ">`;
            
            const rowData = [
                { value: guess.conference, type: 'conference' },
                { value: guess.team, type: 'team' },
                { value: guess.position, type: 'position' },
                { value: guess.receivingYards.toString(), type: 'receivingYards' },
                { value: guess.rushingYards.toString(), type: 'rushingYards' },
                { value: guess.totalTDs.toString(), type: 'totalTDs' }
            ];
            
            rowData.forEach((cellData) => {
                const colorClass = this.getColorClass(cellData.type, guess);
                
                let backgroundColor = '#6b7280'; // default incorrect
                if (colorClass === 'correct') backgroundColor = '#22c55e';
                else if (colorClass === 'close') backgroundColor = '#f59e0b';
                
                gridHTML += `<div style="
                    width: 90px;
                    height: 60px;
                    padding: 0.5rem; 
                    font-size: 1rem; 
                    border-radius: 8px; 
                    font-weight: 600; 
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    text-align: center;
                    background-color: ${backgroundColor};
                    color: white;
                ">${cellData.value}</div>`;
            });
            
            gridHTML += '</div>';
        });
        
        gridHTML += `</div>
                </div>
            </div>`;
        
        return gridHTML;
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
            case 'conference':
                return guessedPlayer.conference === this.targetPlayer.conference ? 'correct' : 'incorrect';
            case 'position':
                return guessedPlayer.position === this.targetPlayer.position ? 'correct' : 'incorrect';
            case 'receivingYards':
                return getStatComparison('receivingYards', 100);
            case 'rushingYards':
                return getStatComparison('rushingYards', 100);
            case 'totalTDs':
                return getStatComparison('totalTDs', 3);
            default:
                return '';
        }
    }
    
    clearGrid() {
        const grid = document.getElementById('player-grid');
        if (grid) {
            grid.innerHTML = '';
            if (this.isMobile()) {
                grid.className = 'player-grid';
            }
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
    window.nflGame = new NFLPlayerChallengeGame();
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