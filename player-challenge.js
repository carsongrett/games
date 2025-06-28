// NFL Player Challenge Game Implementation
class PlayerChallengeGame {
    constructor() {
        // Current NFL Players Database (2024 Season)
        this.players = [
            // AFC East
            { name: "Josh Allen", conference: "AFC", division: "East", team: "BUF", jerseyNumber: 17, age: 28, position: "QB" },
            { name: "Stefon Diggs", conference: "AFC", division: "East", team: "BUF", jerseyNumber: 14, age: 31, position: "WR" },
            { name: "James Cook", conference: "AFC", division: "East", team: "BUF", jerseyNumber: 4, age: 25, position: "RB" },
            { name: "Aaron Rodgers", conference: "AFC", division: "East", team: "NYJ", jerseyNumber: 8, age: 41, position: "QB" },
            { name: "Garrett Wilson", conference: "AFC", division: "East", team: "NYJ", jerseyNumber: 17, age: 24, position: "WR" },
            { name: "Breece Hall", conference: "AFC", division: "East", team: "NYJ", jerseyNumber: 20, age: 23, position: "RB" },
            { name: "Tua Tagovailoa", conference: "AFC", division: "East", team: "MIA", jerseyNumber: 1, age: 26, position: "QB" },
            { name: "Tyreek Hill", conference: "AFC", division: "East", team: "MIA", jerseyNumber: 10, age: 30, position: "WR" },
            { name: "Jaylen Waddle", conference: "AFC", division: "East", team: "MIA", jerseyNumber: 17, age: 26, position: "WR" },
            { name: "Mac Jones", conference: "AFC", division: "East", team: "NE", jerseyNumber: 10, age: 26, position: "QB" },
            { name: "Rhamondre Stevenson", conference: "AFC", division: "East", team: "NE", jerseyNumber: 38, age: 26, position: "RB" },

            // AFC North
            { name: "Lamar Jackson", conference: "AFC", division: "North", team: "BAL", jerseyNumber: 8, age: 27, position: "QB" },
            { name: "Mark Andrews", conference: "AFC", division: "North", team: "BAL", jerseyNumber: 89, age: 29, position: "TE" },
            { name: "Derrick Henry", conference: "AFC", division: "North", team: "BAL", jerseyNumber: 22, age: 30, position: "RB" },
            { name: "Joe Burrow", conference: "AFC", division: "North", team: "CIN", jerseyNumber: 9, age: 28, position: "QB" },
            { name: "Ja'Marr Chase", conference: "AFC", division: "North", team: "CIN", jerseyNumber: 1, age: 24, position: "WR" },
            { name: "Tee Higgins", conference: "AFC", division: "North", team: "CIN", jerseyNumber: 5, age: 25, position: "WR" },
            { name: "Deshaun Watson", conference: "AFC", division: "North", team: "CLE", jerseyNumber: 4, age: 29, position: "QB" },
            { name: "Nick Chubb", conference: "AFC", division: "North", team: "CLE", jerseyNumber: 24, age: 28, position: "RB" },
            { name: "Amari Cooper", conference: "AFC", division: "North", team: "CLE", jerseyNumber: 2, age: 30, position: "WR" },
            { name: "Russell Wilson", conference: "AFC", division: "North", team: "PIT", jerseyNumber: 3, age: 36, position: "QB" },
            { name: "T.J. Watt", conference: "AFC", division: "North", team: "PIT", jerseyNumber: 90, age: 30, position: "LB" },
            { name: "George Pickens", conference: "AFC", division: "North", team: "PIT", jerseyNumber: 14, age: 23, position: "WR" },

            // AFC South
            { name: "C.J. Stroud", conference: "AFC", division: "South", team: "HOU", jerseyNumber: 7, age: 23, position: "QB" },
            { name: "Nico Collins", conference: "AFC", division: "South", team: "HOU", jerseyNumber: 12, age: 25, position: "WR" },
            { name: "Joe Mixon", conference: "AFC", division: "South", team: "HOU", jerseyNumber: 28, age: 28, position: "RB" },
            { name: "Anthony Richardson", conference: "AFC", division: "South", team: "IND", jerseyNumber: 5, age: 22, position: "QB" },
            { name: "Jonathan Taylor", conference: "AFC", division: "South", team: "IND", jerseyNumber: 28, age: 25, position: "RB" },
            { name: "Michael Pittman Jr.", conference: "AFC", division: "South", team: "IND", jerseyNumber: 11, age: 27, position: "WR" },
            { name: "Trevor Lawrence", conference: "AFC", division: "South", team: "JAX", jerseyNumber: 16, age: 25, position: "QB" },
            { name: "Travis Etienne", conference: "AFC", division: "South", team: "JAX", jerseyNumber: 1, age: 25, position: "RB" },
            { name: "Calvin Ridley", conference: "AFC", division: "South", team: "JAX", jerseyNumber: 0, age: 30, position: "WR" },
            { name: "Will Levis", conference: "AFC", division: "South", team: "TEN", jerseyNumber: 8, age: 25, position: "QB" },
            { name: "Tony Pollard", conference: "AFC", division: "South", team: "TEN", jerseyNumber: 1, age: 27, position: "RB" },
            { name: "DeAndre Hopkins", conference: "AFC", division: "South", team: "TEN", jerseyNumber: 10, age: 32, position: "WR" },

            // AFC West
            { name: "Patrick Mahomes", conference: "AFC", division: "West", team: "KC", jerseyNumber: 15, age: 29, position: "QB" },
            { name: "Travis Kelce", conference: "AFC", division: "West", team: "KC", jerseyNumber: 87, age: 35, position: "TE" },
            { name: "Kareem Hunt", conference: "AFC", division: "West", team: "KC", jerseyNumber: 27, age: 29, position: "RB" },
            { name: "Bo Nix", conference: "AFC", division: "West", team: "DEN", jerseyNumber: 10, age: 24, position: "QB" },
            { name: "Courtland Sutton", conference: "AFC", division: "West", team: "DEN", jerseyNumber: 14, age: 29, position: "WR" },
            { name: "Javonte Williams", conference: "AFC", division: "West", team: "DEN", jerseyNumber: 33, age: 24, position: "RB" },
            { name: "Justin Herbert", conference: "AFC", division: "West", team: "LAC", jerseyNumber: 10, age: 26, position: "QB" },
            { name: "Keenan Allen", conference: "AFC", division: "West", team: "LAC", jerseyNumber: 13, age: 32, position: "WR" },
            { name: "J.K. Dobbins", conference: "AFC", division: "West", team: "LAC", jerseyNumber: 27, age: 25, position: "RB" },
            { name: "Gardner Minshew", conference: "AFC", division: "West", team: "LV", jerseyNumber: 15, age: 28, position: "QB" },
            { name: "Davante Adams", conference: "AFC", division: "West", team: "LV", jerseyNumber: 17, age: 32, position: "WR" },
            { name: "Alexander Mattison", conference: "AFC", division: "West", team: "LV", jerseyNumber: 25, age: 26, position: "RB" },

            // NFC East
            { name: "Dak Prescott", conference: "NFC", division: "East", team: "DAL", jerseyNumber: 4, age: 31, position: "QB" },
            { name: "CeeDee Lamb", conference: "NFC", division: "East", team: "DAL", jerseyNumber: 88, age: 25, position: "WR" },
            { name: "Ezekiel Elliott", conference: "NFC", division: "East", team: "DAL", jerseyNumber: 15, age: 29, position: "RB" },
            { name: "Jalen Hurts", conference: "NFC", division: "East", team: "PHI", jerseyNumber: 1, age: 26, position: "QB" },
            { name: "A.J. Brown", conference: "NFC", division: "East", team: "PHI", jerseyNumber: 11, age: 27, position: "WR" },
            { name: "Saquon Barkley", conference: "NFC", division: "East", team: "PHI", jerseyNumber: 26, age: 27, position: "RB" },
            { name: "Daniel Jones", conference: "NFC", division: "East", team: "NYG", jerseyNumber: 8, age: 27, position: "QB" },
            { name: "Malik Nabers", conference: "NFC", division: "East", team: "NYG", jerseyNumber: 1, age: 21, position: "WR" },
            { name: "Devin Singletary", conference: "NFC", division: "East", team: "NYG", jerseyNumber: 26, age: 27, position: "RB" },
            { name: "Jayden Daniels", conference: "NFC", division: "East", team: "WAS", jerseyNumber: 5, age: 24, position: "QB" },
            { name: "Terry McLaurin", conference: "NFC", division: "East", team: "WAS", jerseyNumber: 17, age: 29, position: "WR" },
            { name: "Brian Robinson Jr.", conference: "NFC", division: "East", team: "WAS", jerseyNumber: 8, age: 25, position: "RB" },

            // NFC North
            { name: "Jordan Love", conference: "NFC", division: "North", team: "GB", jerseyNumber: 10, age: 26, position: "QB" },
            { name: "Jayden Reed", conference: "NFC", division: "North", team: "GB", jerseyNumber: 11, age: 24, position: "WR" },
            { name: "Josh Jacobs", conference: "NFC", division: "North", team: "GB", jerseyNumber: 8, age: 26, position: "RB" },
            { name: "Caleb Williams", conference: "NFC", division: "North", team: "CHI", jerseyNumber: 18, age: 23, position: "QB" },
            { name: "DJ Moore", conference: "NFC", division: "North", team: "CHI", jerseyNumber: 2, age: 27, position: "WR" },
            { name: "D'Andre Swift", conference: "NFC", division: "North", team: "CHI", jerseyNumber: 4, age: 25, position: "RB" },
            { name: "Jared Goff", conference: "NFC", division: "North", team: "DET", jerseyNumber: 16, age: 30, position: "QB" },
            { name: "Amon-Ra St. Brown", conference: "NFC", division: "North", team: "DET", jerseyNumber: 14, age: 25, position: "WR" },
            { name: "David Montgomery", conference: "NFC", division: "North", team: "DET", jerseyNumber: 5, age: 27, position: "RB" },
            { name: "Sam Darnold", conference: "NFC", division: "North", team: "MIN", jerseyNumber: 14, age: 27, position: "QB" },
            { name: "Justin Jefferson", conference: "NFC", division: "North", team: "MIN", jerseyNumber: 18, age: 25, position: "WR" },
            { name: "Aaron Jones", conference: "NFC", division: "North", team: "MIN", jerseyNumber: 33, age: 30, position: "RB" },

            // NFC South
            { name: "Kirk Cousins", conference: "NFC", division: "South", team: "ATL", jerseyNumber: 18, age: 36, position: "QB" },
            { name: "Drake London", conference: "NFC", division: "South", team: "ATL", jerseyNumber: 5, age: 23, position: "WR" },
            { name: "Bijan Robinson", conference: "NFC", division: "South", team: "ATL", jerseyNumber: 7, age: 22, position: "RB" },
            { name: "Bryce Young", conference: "NFC", division: "South", team: "CAR", jerseyNumber: 9, age: 23, position: "QB" },
            { name: "Diontae Johnson", conference: "NFC", division: "South", team: "CAR", jerseyNumber: 18, age: 28, position: "WR" },
            { name: "Chuba Hubbard", conference: "NFC", division: "South", team: "CAR", jerseyNumber: 30, age: 25, position: "RB" },
            { name: "Derek Carr", conference: "NFC", division: "South", team: "NO", jerseyNumber: 4, age: 33, position: "QB" },
            { name: "Chris Olave", conference: "NFC", division: "South", team: "NO", jerseyNumber: 12, age: 24, position: "WR" },
            { name: "Alvin Kamara", conference: "NFC", division: "South", team: "NO", jerseyNumber: 41, age: 29, position: "RB" },
            { name: "Baker Mayfield", conference: "NFC", division: "South", team: "TB", jerseyNumber: 6, age: 29, position: "QB" },
            { name: "Mike Evans", conference: "NFC", division: "South", team: "TB", jerseyNumber: 13, age: 31, position: "WR" },
            { name: "Rachaad White", conference: "NFC", division: "South", team: "TB", jerseyNumber: 29, age: 25, position: "RB" },

            // NFC West
            { name: "Kyler Murray", conference: "NFC", division: "West", team: "ARI", jerseyNumber: 1, age: 27, position: "QB" },
            { name: "Marvin Harrison Jr.", conference: "NFC", division: "West", team: "ARI", jerseyNumber: 18, age: 22, position: "WR" },
            { name: "James Conner", conference: "NFC", division: "West", team: "ARI", jerseyNumber: 6, age: 29, position: "RB" },
            { name: "Matthew Stafford", conference: "NFC", division: "West", team: "LAR", jerseyNumber: 9, age: 36, position: "QB" },
            { name: "Cooper Kupp", conference: "NFC", division: "West", team: "LAR", jerseyNumber: 10, age: 31, position: "WR" },
            { name: "Kyren Williams", conference: "NFC", division: "West", team: "LAR", jerseyNumber: 23, age: 24, position: "RB" },
            { name: "Brock Purdy", conference: "NFC", division: "West", team: "SF", jerseyNumber: 13, age: 25, position: "QB" },
            { name: "Deebo Samuel", conference: "NFC", division: "West", team: "SF", jerseyNumber: 19, age: 28, position: "WR" },
            { name: "Christian McCaffrey", conference: "NFC", division: "West", team: "SF", jerseyNumber: 23, age: 28, position: "RB" },
            { name: "Geno Smith", conference: "NFC", division: "West", team: "SEA", jerseyNumber: 7, age: 34, position: "QB" },
            { name: "DK Metcalf", conference: "NFC", division: "West", team: "SEA", jerseyNumber: 14, age: 27, position: "WR" },
            { name: "Kenneth Walker III", conference: "NFC", division: "West", team: "SEA", jerseyNumber: 9, age: 24, position: "RB" },

            // Additional Notable Players
            { name: "Myles Garrett", conference: "AFC", division: "North", team: "CLE", jerseyNumber: 95, age: 29, position: "DE" },
            { name: "Aaron Donald", conference: "NFC", division: "West", team: "LAR", jerseyNumber: 99, age: 33, position: "DT" },
            { name: "Nick Bosa", conference: "NFC", division: "West", team: "SF", jerseyNumber: 97, age: 27, position: "DE" },
            { name: "Khalil Mack", conference: "AFC", division: "West", team: "LAC", jerseyNumber: 52, age: 33, position: "LB" },
            { name: "Micah Parsons", conference: "NFC", division: "East", team: "DAL", jerseyNumber: 11, age: 25, position: "LB" },
            { name: "Sauce Gardner", conference: "AFC", division: "East", team: "NYJ", jerseyNumber: 1, age: 24, position: "CB" },
            { name: "Jalen Ramsey", conference: "NFC", division: "South", team: "MIA", jerseyNumber: 5, age: 30, position: "CB" },
            { name: "Derwin James", conference: "AFC", division: "West", team: "LAC", jerseyNumber: 3, age: 28, position: "S" },
            
            // Additional Skill Position Players
            { name: "George Kittle", conference: "NFC", division: "West", team: "SF", jerseyNumber: 85, age: 31, position: "TE" },
            { name: "Darren Waller", conference: "NFC", division: "East", team: "NYG", jerseyNumber: 12, age: 32, position: "TE" },
            { name: "T.J. Hockenson", conference: "NFC", division: "North", team: "MIN", jerseyNumber: 87, age: 27, position: "TE" },
            { name: "Evan Engram", conference: "AFC", division: "South", team: "JAX", jerseyNumber: 17, age: 30, position: "TE" },
            { name: "Kyle Pitts", conference: "NFC", division: "South", team: "ATL", jerseyNumber: 8, age: 24, position: "TE" },
            { name: "Dallas Goedert", conference: "NFC", division: "East", team: "PHI", jerseyNumber: 88, age: 29, position: "TE" },
            
            // More Current Stars
            { name: "Puka Nacua", conference: "NFC", division: "West", team: "LAR", jerseyNumber: 17, age: 23, position: "WR" },
            { name: "Rome Odunze", conference: "NFC", division: "North", team: "CHI", jerseyNumber: 1, age: 22, position: "WR" },
            { name: "Brian Thomas Jr.", conference: "AFC", division: "South", team: "JAX", jerseyNumber: 7, age: 22, position: "WR" },
            { name: "Ladd McConkey", conference: "AFC", division: "West", team: "LAC", jerseyNumber: 15, age: 23, position: "WR" },
            { name: "Xavier Worthy", conference: "AFC", division: "West", team: "KC", jerseyNumber: 1, age: 21, position: "WR" },
            { name: "Jaylon Johnson", conference: "NFC", division: "East", team: "PHI", jerseyNumber: 22, age: 25, position: "CB" },
            { name: "Roquan Smith", conference: "AFC", division: "North", team: "BAL", jerseyNumber: 0, age: 27, position: "LB" },
            { name: "Fred Warner", conference: "NFC", division: "West", team: "SF", jerseyNumber: 54, age: 28, position: "LB" },
        ];
        
        this.targetPlayer = null;
        this.guesses = [];
        this.maxGuesses = 8;
        this.gameOver = false;
        this.gameWon = false;
    }
    
    initialize() {
        this.targetPlayer = this.players[Math.floor(Math.random() * this.players.length)];
        this.guesses = [];
        this.gameOver = false;
        this.gameWon = false;
        
        this.populateDropdown();
        this.updateDisplay();
        this.clearGrid();
        
        // Setup dropdown event listener
        document.getElementById('player-dropdown').addEventListener('change', this.handleDropdownChange.bind(this));
        
        hideMessage('player-message');
        
        console.log('Target player:', this.targetPlayer.name); // For testing
    }
    
    populateDropdown() {
        const dropdown = document.getElementById('player-dropdown');
        dropdown.innerHTML = '<option value="">Select a player...</option>';
        
        // Sort players alphabetically
        const sortedPlayers = [...this.players].sort((a, b) => a.name.localeCompare(b.name));
        
        sortedPlayers.forEach((player, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${player.name} (${player.team}) - ${player.position}`;
            option.dataset.originalIndex = this.players.findIndex(p => p.name === player.name);
            dropdown.appendChild(option);
        });
    }
    
    handleDropdownChange() {
        const dropdown = document.getElementById('player-dropdown');
        const submitBtn = document.getElementById('submit-guess-btn');
        
        if (dropdown.value) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }
    
    submitPlayerGuess() {
        if (this.gameOver) return;
        
        const dropdown = document.getElementById('player-dropdown');
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        
        if (!selectedOption.dataset.originalIndex) return;
        
        const playerIndex = parseInt(selectedOption.dataset.originalIndex);
        const guessedPlayer = this.players[playerIndex];
        
        // Check if already guessed
        if (this.guesses.some(guess => guess.name === guessedPlayer.name)) {
            showMessage('player-message', 'You already guessed this player!', 'error', 2000);
            return;
        }
        
        // Add guess
        this.guesses.push(guessedPlayer);
        this.addGuessToGrid(guessedPlayer);
        
        // Check win condition
        if (guessedPlayer.name === this.targetPlayer.name) {
            this.gameWon = true;
            this.gameOver = true;
            showMessage('player-message', `🎉 Congratulations! You found ${this.targetPlayer.name} in ${this.guesses.length} guess${this.guesses.length === 1 ? '' : 'es'}!`, 'success', 0);
        } else if (this.guesses.length >= this.maxGuesses) {
            this.gameOver = true;
            showMessage('player-message', `Game Over! The player was ${this.targetPlayer.name} (${this.targetPlayer.team}) - ${this.targetPlayer.position}`, 'error', 0);
        }
        
        // Reset dropdown
        dropdown.value = '';
        document.getElementById('submit-guess-btn').disabled = true;
        
        this.updateDisplay();
    }
    
    addGuessToGrid(guessedPlayer) {
        const grid = document.getElementById('player-grid');
        
        // Create row data
        const rowData = [
            { value: guessedPlayer.conference, type: 'conference' },
            { value: guessedPlayer.division, type: 'division' },
            { value: guessedPlayer.team, type: 'team' },
            { value: guessedPlayer.jerseyNumber.toString(), type: 'jersey' },
            { value: guessedPlayer.age.toString(), type: 'age' },
            { value: guessedPlayer.position, type: 'position' }
        ];
        
        // Add cells to grid
        rowData.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = 'grid-cell';
            cellElement.textContent = cell.value;
            
            // Apply color coding
            const colorClass = this.getColorClass(cell.type, guessedPlayer);
            cellElement.classList.add(colorClass);
            
            grid.appendChild(cellElement);
        });
    }
    
    getColorClass(type, guessedPlayer) {
        const target = this.targetPlayer;
        
        switch (type) {
            case 'conference':
                return guessedPlayer.conference === target.conference ? 'correct' : 'incorrect';
                
            case 'division':
                return guessedPlayer.division === target.division ? 'correct' : 'incorrect';
                
            case 'team':
                return guessedPlayer.team === target.team ? 'correct' : 'incorrect';
                
            case 'jersey':
                const jerseyDiff = Math.abs(guessedPlayer.jerseyNumber - target.jerseyNumber);
                if (jerseyDiff === 0) return 'correct';
                if (jerseyDiff <= 2) return 'close';
                return 'incorrect';
                
            case 'age':
                const ageDiff = Math.abs(guessedPlayer.age - target.age);
                if (ageDiff === 0) return 'correct';
                if (ageDiff <= 2) return 'close';
                return 'incorrect';
                
            case 'position':
                return guessedPlayer.position === target.position ? 'correct' : 'incorrect';
                
            default:
                return 'incorrect';
        }
    }
    
    clearGrid() {
        document.getElementById('player-grid').innerHTML = '';
    }
    
    updateDisplay() {
        document.getElementById('player-guesses').textContent = this.guesses.length;
    }
}

// Global Player Challenge game instance
let playerChallengeGame = new PlayerChallengeGame();

// Initialize the Player Challenge game
function initializePlayerChallenge() {
    if (!playerChallengeGame) {
        playerChallengeGame = new PlayerChallengeGame();
    }
    // Only initialize if not already initialized or if restarting
    if (playerChallengeGame.guesses.length === 0 || !playerChallengeGame.targetPlayer) {
        playerChallengeGame.initialize();
    }
}

// Start a new Player Challenge game
function newPlayerGame() {
    playerChallengeGame = new PlayerChallengeGame();
    playerChallengeGame.initialize();
}

// Handle guess submission
function submitPlayerGuess() {
    if (playerChallengeGame) {
        playerChallengeGame.submitPlayerGuess();
    }
} 