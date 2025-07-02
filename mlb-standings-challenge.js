// MLB Standings Challenge Game
class MLBStandingsGame {
    constructor() {
        this.alStandings = [];
        this.nlStandings = [];
        this.allTeams = [];
        this.lives = 10;
        this.maxLives = 10;
        this.gameOver = false;
        this.teamsRevealed = 0;
        this.totalTeams = 30;
        this.currentSeason = new Date().getFullYear();
    }

    async initialize() {
        this.showMessage('Loading current MLB standings...', 'info');
        await this.loadStandingsData();
        this.setupGame();
    }

    async loadStandingsData() {
        try {
            // Use current year for season
            const apiUrl = `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${this.currentSeason}&standingsTypes=regularSeason`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Parse the standings data
            this.parseStandingsData(data);
            
            console.log(`Loaded ${this.alStandings.length} AL teams and ${this.nlStandings.length} NL teams`);
            
        } catch (error) {
            console.error('Error loading standings data:', error);
            this.showMessage('Unable to load current standings. Using sample data for demo.', 'error');
            this.loadSampleData();
        }
    }

    parseStandingsData(data) {
        this.alStandings = [];
        this.nlStandings = [];
        this.allTeams = [];

        if (data.records && data.records.length > 0) {
            data.records.forEach(division => {
                if (division.teamRecords) {
                    division.teamRecords.forEach(team => {
                        const teamData = {
                            id: team.team.id,
                            name: team.team.name,
                            wins: team.wins,
                            losses: team.losses,
                            leagueRank: team.leagueRank,
                            league: team.team.league?.name || 'Unknown',
                            revealed: false,
                            guessed: false
                        };

                        this.allTeams.push(teamData);

                        // Sort into AL and NL based on league
                        if (teamData.league.includes('American')) {
                            this.alStandings.push(teamData);
                        } else if (teamData.league.includes('National')) {
                            this.nlStandings.push(teamData);
                        }
                    });
                }
            });

            // Sort by league rank
            this.alStandings.sort((a, b) => a.leagueRank - b.leagueRank);
            this.nlStandings.sort((a, b) => a.leagueRank - b.leagueRank);
        }

        // If we don't have enough teams, use sample data
        if (this.alStandings.length < 10 || this.nlStandings.length < 10) {
            this.loadSampleData();
        }
    }

    loadSampleData() {
        // Sample data for demonstration if API fails
        this.alStandings = [
            { id: 1, name: "Baltimore Orioles", wins: 95, losses: 67, leagueRank: 1, league: "American League", revealed: false, guessed: false },
            { id: 2, name: "Houston Astros", wins: 90, losses: 72, leagueRank: 2, league: "American League", revealed: false, guessed: false },
            { id: 3, name: "Tampa Bay Rays", wins: 88, losses: 74, leagueRank: 3, league: "American League", revealed: false, guessed: false },
            { id: 4, name: "Toronto Blue Jays", wins: 85, losses: 77, leagueRank: 4, league: "American League", revealed: false, guessed: false },
            { id: 5, name: "New York Yankees", wins: 82, losses: 80, leagueRank: 5, league: "American League", revealed: false, guessed: false },
            { id: 6, name: "Seattle Mariners", wins: 80, losses: 82, leagueRank: 6, league: "American League", revealed: false, guessed: false },
            { id: 7, name: "Boston Red Sox", wins: 78, losses: 84, leagueRank: 7, league: "American League", revealed: false, guessed: false },
            { id: 8, name: "Minnesota Twins", wins: 76, losses: 86, leagueRank: 8, league: "American League", revealed: false, guessed: false },
            { id: 9, name: "Los Angeles Angels", wins: 73, losses: 89, leagueRank: 9, league: "American League", revealed: false, guessed: false },
            { id: 10, name: "Texas Rangers", wins: 71, losses: 91, leagueRank: 10, league: "American League", revealed: false, guessed: false },
            { id: 11, name: "Cleveland Guardians", wins: 69, losses: 93, leagueRank: 11, league: "American League", revealed: false, guessed: false },
            { id: 12, name: "Chicago White Sox", wins: 67, losses: 95, leagueRank: 12, league: "American League", revealed: false, guessed: false },
            { id: 13, name: "Detroit Tigers", wins: 65, losses: 97, leagueRank: 13, league: "American League", revealed: false, guessed: false },
            { id: 14, name: "Kansas City Royals", wins: 63, losses: 99, leagueRank: 14, league: "American League", revealed: false, guessed: false },
            { id: 15, name: "Oakland Athletics", wins: 60, losses: 102, leagueRank: 15, league: "American League", revealed: false, guessed: false }
        ];

        this.nlStandings = [
            { id: 16, name: "Atlanta Braves", wins: 104, losses: 58, leagueRank: 1, league: "National League", revealed: false, guessed: false },
            { id: 17, name: "Los Angeles Dodgers", wins: 100, losses: 62, leagueRank: 2, league: "National League", revealed: false, guessed: false },
            { id: 18, name: "Philadelphia Phillies", wins: 90, losses: 72, leagueRank: 3, league: "National League", revealed: false, guessed: false },
            { id: 19, name: "Milwaukee Brewers", wins: 88, losses: 74, leagueRank: 4, league: "National League", revealed: false, guessed: false },
            { id: 20, name: "Arizona Diamondbacks", wins: 84, losses: 78, leagueRank: 5, league: "National League", revealed: false, guessed: false },
            { id: 21, name: "Miami Marlins", wins: 84, losses: 78, leagueRank: 6, league: "National League", revealed: false, guessed: false },
            { id: 22, name: "San Francisco Giants", wins: 79, losses: 83, leagueRank: 7, league: "National League", revealed: false, guessed: false },
            { id: 23, name: "Cincinnati Reds", wins: 82, losses: 80, leagueRank: 8, league: "National League", revealed: false, guessed: false },
            { id: 24, name: "Chicago Cubs", wins: 83, losses: 79, leagueRank: 9, league: "National League", revealed: false, guessed: false },
            { id: 25, name: "New York Mets", wins: 75, losses: 87, leagueRank: 10, league: "National League", revealed: false, guessed: false },
            { id: 26, name: "San Diego Padres", wins: 82, losses: 80, leagueRank: 11, league: "National League", revealed: false, guessed: false },
            { id: 27, name: "St. Louis Cardinals", wins: 71, losses: 91, leagueRank: 12, league: "National League", revealed: false, guessed: false },
            { id: 28, name: "Pittsburgh Pirates", wins: 76, losses: 86, leagueRank: 13, league: "National League", revealed: false, guessed: false },
            { id: 29, name: "Washington Nationals", wins: 71, losses: 91, leagueRank: 14, league: "National League", revealed: false, guessed: false },
            { id: 30, name: "Colorado Rockies", wins: 59, losses: 103, leagueRank: 15, league: "National League", revealed: false, guessed: false }
        ];

        this.allTeams = [...this.alStandings, ...this.nlStandings];
    }

    setupGame() {
        this.lives = this.maxLives;
        this.gameOver = false;
        this.teamsRevealed = 0;
        
        // Reset all teams to unrevealed
        this.allTeams.forEach(team => {
            team.revealed = false;
            team.guessed = false;
        });

        this.renderStandings();
        this.updateDisplay();
        this.hideMessage();
    }

    renderStandings() {
        this.renderLeagueStandings('al', this.alStandings, 'American League');
        this.renderLeagueStandings('nl', this.nlStandings, 'National League');
    }

    renderLeagueStandings(leagueId, standings, leagueName) {
        const container = document.getElementById(`mlb-standings-${leagueId}`);
        if (!container) return;

        let html = `
            <div class="league-header">
                <h3>${leagueName}</h3>
            </div>
            <div class="standings-table">
                <div class="standings-header">
                    <div class="rank-col">Rank</div>
                    <div class="team-col">Team</div>
                    <div class="record-col">W-L</div>
                </div>
        `;

        standings.forEach(team => {
            const teamDisplay = team.revealed ? 
                `<span class="revealed-team">${team.name}</span>` : 
                `<button class="hidden-team-btn" onclick="openTeamSelector(${team.id}, '${leagueId}', ${team.leagueRank})">
                    ${team.guessed ? '<span class="incorrect-guess">❌</span>' : ''}
                    Click to guess
                </button>`;

            html += `
                <div class="standings-row ${team.revealed ? 'revealed' : ''} ${team.guessed && !team.revealed ? 'guessed-wrong' : ''}">
                    <div class="rank-col">${team.leagueRank}</div>
                    <div class="team-col">${teamDisplay}</div>
                    <div class="record-col">${team.wins}-${team.losses}</div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    openTeamSelector(teamId, leagueId, rank) {
        if (this.gameOver) return;

        const team = this.allTeams.find(t => t.id === teamId);
        if (!team || team.revealed) return;

        // Create and show dropdown modal
        this.showTeamSelector(teamId, leagueId, rank);
    }

    showTeamSelector(teamId, leagueId, rank) {
        const existingModal = document.getElementById('team-selector-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'team-selector-modal';
        modal.className = 'team-selector-modal';

        // Sort teams alphabetically for the dropdown
        const sortedTeams = [...this.allTeams].sort((a, b) => a.name.localeCompare(b.name));

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Select Team for ${leagueId.toUpperCase()} Rank #${rank}</h4>
                    <button class="close-modal" onclick="closeTeamSelector()">×</button>
                </div>
                <div class="modal-body">
                    <select id="team-selector" class="team-dropdown">
                        <option value="">Choose a team...</option>
                        ${sortedTeams.map(team => 
                            `<option value="${team.id}">${team.name}</option>`
                        ).join('')}
                    </select>
                    <div class="modal-actions">
                        <button onclick="submitTeamGuess(${teamId})" id="submit-guess-btn" disabled>Submit Guess</button>
                        <button onclick="closeTeamSelector()" class="cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Enable submit button when selection is made
        const selector = document.getElementById('team-selector');
        selector.addEventListener('change', function() {
            const submitBtn = document.getElementById('submit-guess-btn');
            submitBtn.disabled = !this.value;
        });

        // Focus on dropdown
        selector.focus();
    }

    submitTeamGuess(actualTeamId) {
        const selector = document.getElementById('team-selector');
        const guessedTeamId = parseInt(selector.value);

        if (!guessedTeamId) return;

        const actualTeam = this.allTeams.find(t => t.id === actualTeamId);
        const guessedTeam = this.allTeams.find(t => t.id === guessedTeamId);

        if (!actualTeam || !guessedTeam) return;

        actualTeam.guessed = true;

        if (actualTeamId === guessedTeamId) {
            // Correct guess
            actualTeam.revealed = true;
            this.teamsRevealed++;
            this.showMessage(`Correct! ${actualTeam.name} is in ${actualTeam.leagueRank}${this.getOrdinalSuffix(actualTeam.leagueRank)} place!`, 'success');
            
            // Check for win condition
            if (this.teamsRevealed >= this.totalTeams) {
                this.endGame(true);
                return;
            }
        } else {
            // Incorrect guess
            actualTeam.revealed = true;
            this.teamsRevealed++;
            this.lives--;
            this.showMessage(`Incorrect! You guessed ${guessedTeam.name}, but ${actualTeam.name} is in ${actualTeam.leagueRank}${this.getOrdinalSuffix(actualTeam.leagueRank)} place. Lives remaining: ${this.lives}`, 'error');
            
            // Check for lose condition
            if (this.lives <= 0) {
                this.endGame(false);
                return;
            }
        }

        this.closeTeamSelector();
        this.renderStandings();
        this.updateDisplay();
    }

    getOrdinalSuffix(number) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
            return 'th';
        }
        
        switch (lastDigit) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    closeTeamSelector() {
        const modal = document.getElementById('team-selector-modal');
        if (modal) {
            modal.remove();
        }
    }

    endGame(won) {
        this.gameOver = true;
        this.closeTeamSelector();
        
        if (won) {
            this.showMessage(`🎉 Congratulations! You identified all 30 MLB teams with ${this.lives} lives remaining!`, 'success');
        } else {
            this.showMessage(`💀 Game Over! You ran out of lives. You identified ${this.teamsRevealed} out of ${this.totalTeams} teams.`, 'error');
        }
        
        this.updateDisplay();
    }

    newGame() {
        this.setupGame();
        this.showMessage('New game started! Click on any team position to make your guess.', 'info');
    }

    updateDisplay() {
        // Update lives counter
        const livesDisplay = document.getElementById('mlb-standings-lives');
        if (livesDisplay) {
            livesDisplay.textContent = this.lives;
        }

        // Update teams revealed counter
        const progressDisplay = document.getElementById('mlb-standings-progress');
        if (progressDisplay) {
            progressDisplay.textContent = `${this.teamsRevealed}/${this.totalTeams}`;
        }

        // Update new game button
        const newGameBtn = document.getElementById('mlb-standings-new-game');
        if (newGameBtn) {
            newGameBtn.style.display = this.gameOver ? 'inline-block' : 'inline-block';
            newGameBtn.textContent = this.gameOver ? 'Play Again' : 'New Game';
        }
    }

    showMessage(message, type) {
        const messageElement = document.getElementById('mlb-standings-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `game-message ${type}`;
            messageElement.style.display = 'block';
        }
    }

    hideMessage() {
        const messageElement = document.getElementById('mlb-standings-message');
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    }
}

// Global game instance
let mlbStandingsGame = null;

// Initialize game when section is opened
async function initializeMLBStandingsGame() {
    if (!mlbStandingsGame) {
        mlbStandingsGame = new MLBStandingsGame();
        await mlbStandingsGame.initialize();
    }
}

// Game functions
function openTeamSelector(teamId, leagueId, rank) {
    if (mlbStandingsGame) {
        mlbStandingsGame.openTeamSelector(teamId, leagueId, rank);
    }
}

function submitTeamGuess(teamId) {
    if (mlbStandingsGame) {
        mlbStandingsGame.submitTeamGuess(teamId);
    }
}

function closeTeamSelector() {
    if (mlbStandingsGame) {
        mlbStandingsGame.closeTeamSelector();
    }
}

function newMLBStandingsGame() {
    if (mlbStandingsGame) {
        mlbStandingsGame.newGame();
    }
}

// Auto-initialize if page loads directly to standings game
if (window.location.pathname === '/mlb-standings-challenge' || window.location.hash === '#mlb-standings-challenge') {
    document.addEventListener('DOMContentLoaded', initializeMLBStandingsGame);
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTeamSelector();
    }
}); 