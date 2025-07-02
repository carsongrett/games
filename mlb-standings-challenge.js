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
        // Use 2025 as requested (will fall back to sample data if no current standings)
        this.currentSeason = 2025;
        
        // Team name to league mapping since API league info might be undefined
        this.teamLeagueMap = {
            "Arizona Diamondbacks": "NL",
            "Atlanta Braves": "NL", 
            "Baltimore Orioles": "AL",
            "Boston Red Sox": "AL",
            "Chicago Cubs": "NL",
            "Chicago White Sox": "AL",
            "Cincinnati Reds": "NL",
            "Cleveland Guardians": "AL",
            "Colorado Rockies": "NL",
            "Detroit Tigers": "AL",
            "Houston Astros": "AL",
            "Kansas City Royals": "AL",
            "Los Angeles Angels": "AL",
            "Los Angeles Dodgers": "NL",
            "Miami Marlins": "NL",
            "Milwaukee Brewers": "NL",
            "Minnesota Twins": "AL",
            "New York Mets": "NL",
            "New York Yankees": "AL",
            "Oakland Athletics": "AL",
            "Philadelphia Phillies": "NL",
            "Pittsburgh Pirates": "NL",
            "San Diego Padres": "NL",
            "San Francisco Giants": "NL",
            "Seattle Mariners": "AL",
            "St. Louis Cardinals": "NL",
            "Tampa Bay Rays": "AL",
            "Texas Rangers": "AL",
            "Toronto Blue Jays": "AL",
            "Washington Nationals": "NL"
        };
    }

    async initialize() {
        this.showMessage('Loading current MLB standings...', 'info');
        await this.loadStandingsData();
        this.setupGame();
    }

    async loadStandingsData() {
        try {
            // Try to fetch current season standings
            let apiUrl = `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${this.currentSeason}&standingsTypes=regularSeason`;
            console.log(`Fetching standings from: ${apiUrl}`);
            
            let response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
            }
            
            let data = await response.json();
            console.log('API Response:', data);
            
            // Parse the standings data
            this.parseStandingsData(data);
            
            // Check if we got meaningful data (not all 0-0 records indicating season hasn't started)
            const hasGamesPlayed = this.allTeams.some(team => team.wins > 0 || team.losses > 0);
            
            if (this.alStandings.length > 0 && this.nlStandings.length > 0 && hasGamesPlayed) {
                console.log(`Successfully loaded ${this.alStandings.length} AL teams and ${this.nlStandings.length} NL teams for ${this.currentSeason} season`);
                this.showMessage(`Loaded ${this.currentSeason} MLB standings successfully!`, 'success');
                setTimeout(() => this.hideMessage(), 2000);
            } else if (!hasGamesPlayed && this.currentSeason >= 2025) {
                // Try previous season if current season hasn't started
                console.log(`${this.currentSeason} season hasn't started, trying 2024...`);
                apiUrl = `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2024&standingsTypes=regularSeason`;
                console.log(`Fetching 2024 standings from: ${apiUrl}`);
                
                response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`2024 API request failed: ${response.status} - ${response.statusText}`);
                }
                
                data = await response.json();
                this.parseStandingsData(data);
                
                if (this.alStandings.length > 0 && this.nlStandings.length > 0) {
                    console.log(`Successfully loaded 2024 standings as fallback`);
                    this.showMessage(`Loaded 2024 MLB standings (${this.currentSeason} season hasn't started yet)`, 'success');
                    setTimeout(() => this.hideMessage(), 3000);
                } else {
                    throw new Error('No valid team data found in 2024 API response');
                }
            } else {
                throw new Error('No valid team data found in API response');
            }
            
        } catch (error) {
            console.error('Error loading standings data:', error);
            this.showMessage(`Unable to load standings data from API. Using sample data for demo.`, 'error');
            this.loadSampleData();
            setTimeout(() => this.hideMessage(), 3000);
        }
    }

    parseStandingsData(data) {
        console.log('Parsing API data:', data);
        this.alStandings = [];
        this.nlStandings = [];
        this.allTeams = [];

        if (data.records && data.records.length > 0) {
            let allTeamsTemp = [];
            
                            data.records.forEach(division => {
                if (division.teamRecords) {
                    division.teamRecords.forEach(team => {
                        // Use our team league mapping instead of API league info
                        const leagueAbbr = this.teamLeagueMap[team.team.name] || 'Unknown';
                        const leagueFull = leagueAbbr === 'AL' ? 'American League' : leagueAbbr === 'NL' ? 'National League' : 'Unknown';
                        
                        const teamData = {
                            id: team.team.id,
                            name: team.team.name,
                            wins: team.wins || 0,
                            losses: team.losses || 0,
                            winningPercentage: team.winningPercentage || '0.000',
                            leagueId: leagueAbbr === 'AL' ? 103 : leagueAbbr === 'NL' ? 104 : null,
                            league: leagueFull,
                            leagueAbbr: leagueAbbr,
                            revealed: false,
                            guessed: false
                        };

                        allTeamsTemp.push(teamData);
                        console.log('Found team:', teamData.name, 'League:', teamData.leagueAbbr, 'Record:', teamData.wins + '-' + teamData.losses);
                    });
                }
            });

            // Separate by league abbreviation and sort by winning percentage
            const alTeams = allTeamsTemp.filter(team => team.leagueAbbr === 'AL');
            const nlTeams = allTeamsTemp.filter(team => team.leagueAbbr === 'NL');
            
            // Sort by winning percentage (descending)
            alTeams.sort((a, b) => parseFloat(b.winningPercentage) - parseFloat(a.winningPercentage));
            nlTeams.sort((a, b) => parseFloat(b.winningPercentage) - parseFloat(a.winningPercentage));
            
            // Assign league ranks
            alTeams.forEach((team, index) => {
                team.leagueRank = index + 1;
            });
            nlTeams.forEach((team, index) => {
                team.leagueRank = index + 1;
            });

            this.alStandings = alTeams;
            this.nlStandings = nlTeams;
            this.allTeams = [...this.alStandings, ...this.nlStandings];
            
            console.log(`Successfully parsed ${this.alStandings.length} AL teams and ${this.nlStandings.length} NL teams`);
            console.log('AL Teams:', this.alStandings.map(t => `${t.leagueRank}. ${t.name} (${t.wins}-${t.losses})`));
            console.log('NL Teams:', this.nlStandings.map(t => `${t.leagueRank}. ${t.name} (${t.wins}-${t.losses})`));
        }

        // If we don't have the expected number of teams, use sample data (MLB has exactly 15 teams per league)
        if (this.alStandings.length < 14 || this.nlStandings.length < 14) {
            console.log(`Not enough teams found (AL: ${this.alStandings.length}, NL: ${this.nlStandings.length}), loading sample data`);
            this.loadSampleData();
        } else {
            console.log(`✅ Successfully using API data: ${this.alStandings.length} AL teams, ${this.nlStandings.length} NL teams`);
        }
    }

    loadSampleData() {
        console.log('Loading sample data...');
        // Sample data using realistic MLB team IDs
        this.alStandings = [
            { id: 110, name: "Baltimore Orioles", wins: 101, losses: 61, leagueRank: 1, league: "American League", revealed: false, guessed: false },
            { id: 117, name: "Houston Astros", wins: 90, losses: 72, leagueRank: 2, league: "American League", revealed: false, guessed: false },
            { id: 139, name: "Tampa Bay Rays", wins: 99, losses: 63, leagueRank: 3, league: "American League", revealed: false, guessed: false },
            { id: 141, name: "Toronto Blue Jays", wins: 89, losses: 73, leagueRank: 4, league: "American League", revealed: false, guessed: false },
            { id: 147, name: "New York Yankees", wins: 82, losses: 80, leagueRank: 5, league: "American League", revealed: false, guessed: false },
            { id: 136, name: "Seattle Mariners", wins: 88, losses: 74, leagueRank: 6, league: "American League", revealed: false, guessed: false },
            { id: 111, name: "Boston Red Sox", wins: 78, losses: 84, leagueRank: 7, league: "American League", revealed: false, guessed: false },
            { id: 142, name: "Minnesota Twins", wins: 87, losses: 75, leagueRank: 8, league: "American League", revealed: false, guessed: false },
            { id: 108, name: "Los Angeles Angels", wins: 73, losses: 89, leagueRank: 9, league: "American League", revealed: false, guessed: false },
            { id: 140, name: "Texas Rangers", wins: 90, losses: 72, leagueRank: 10, league: "American League", revealed: false, guessed: false },
            { id: 114, name: "Cleveland Guardians", wins: 76, losses: 86, leagueRank: 11, league: "American League", revealed: false, guessed: false },
            { id: 145, name: "Chicago White Sox", wins: 61, losses: 101, leagueRank: 12, league: "American League", revealed: false, guessed: false },
            { id: 116, name: "Detroit Tigers", wins: 78, losses: 84, leagueRank: 13, league: "American League", revealed: false, guessed: false },
            { id: 118, name: "Kansas City Royals", wins: 56, losses: 106, leagueRank: 14, league: "American League", revealed: false, guessed: false },
            { id: 133, name: "Oakland Athletics", wins: 50, losses: 112, leagueRank: 15, league: "American League", revealed: false, guessed: false }
        ];

        this.nlStandings = [
            { id: 144, name: "Atlanta Braves", wins: 104, losses: 58, leagueRank: 1, league: "National League", revealed: false, guessed: false },
            { id: 119, name: "Los Angeles Dodgers", wins: 100, losses: 62, leagueRank: 2, league: "National League", revealed: false, guessed: false },
            { id: 143, name: "Philadelphia Phillies", wins: 90, losses: 72, leagueRank: 3, league: "National League", revealed: false, guessed: false },
            { id: 158, name: "Milwaukee Brewers", wins: 88, losses: 74, leagueRank: 4, league: "National League", revealed: false, guessed: false },
            { id: 109, name: "Arizona Diamondbacks", wins: 84, losses: 78, leagueRank: 5, league: "National League", revealed: false, guessed: false },
            { id: 146, name: "Miami Marlins", wins: 84, losses: 78, leagueRank: 6, league: "National League", revealed: false, guessed: false },
            { id: 137, name: "San Francisco Giants", wins: 79, losses: 83, leagueRank: 7, league: "National League", revealed: false, guessed: false },
            { id: 113, name: "Cincinnati Reds", wins: 82, losses: 80, leagueRank: 8, league: "National League", revealed: false, guessed: false },
            { id: 112, name: "Chicago Cubs", wins: 83, losses: 79, leagueRank: 9, league: "National League", revealed: false, guessed: false },
            { id: 121, name: "New York Mets", wins: 75, losses: 87, leagueRank: 10, league: "National League", revealed: false, guessed: false },
            { id: 135, name: "San Diego Padres", wins: 82, losses: 80, leagueRank: 11, league: "National League", revealed: false, guessed: false },
            { id: 138, name: "St. Louis Cardinals", wins: 71, losses: 91, leagueRank: 12, league: "National League", revealed: false, guessed: false },
            { id: 134, name: "Pittsburgh Pirates", wins: 76, losses: 86, leagueRank: 13, league: "National League", revealed: false, guessed: false },
            { id: 120, name: "Washington Nationals", wins: 71, losses: 91, leagueRank: 14, league: "National League", revealed: false, guessed: false },
            { id: 115, name: "Colorado Rockies", wins: 59, losses: 103, leagueRank: 15, league: "National League", revealed: false, guessed: false }
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
                        <button id="submit-guess-btn" onclick="submitTeamGuess(${teamId})" disabled>Submit Guess</button>
                        <button onclick="closeTeamSelector()" class="cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Wait for DOM to be ready, then setup event listeners
        setTimeout(() => {
            const selector = document.getElementById('team-selector');
            const submitBtn = document.getElementById('submit-guess-btn');
            
            if (selector && submitBtn) {
                // Enable submit button when selection is made
                selector.addEventListener('change', function() {
                    submitBtn.disabled = !this.value;
                    console.log('Selection changed:', this.value, 'Button disabled:', submitBtn.disabled);
                });

                // Also enable on input event for better responsiveness
                selector.addEventListener('input', function() {
                    submitBtn.disabled = !this.value;
                });

                // Focus on dropdown
                selector.focus();
            }
        }, 100);
    }

    submitTeamGuess(actualTeamId) {
        console.log('submitTeamGuess called with actualTeamId:', actualTeamId);
        
        const selector = document.getElementById('team-selector');
        const guessedTeamId = parseInt(selector.value);
        
        console.log('Selected value:', selector.value, 'Parsed as:', guessedTeamId);

        if (!guessedTeamId) {
            console.log('No team selected, returning');
            return;
        }

        const actualTeam = this.allTeams.find(t => t.id === actualTeamId);
        const guessedTeam = this.allTeams.find(t => t.id === guessedTeamId);
        
        console.log('Actual team:', actualTeam);
        console.log('Guessed team:', guessedTeam);

        if (!actualTeam || !guessedTeam) {
            console.log('Team not found, returning');
            return;
        }

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
    console.log('Global submitTeamGuess called with teamId:', teamId);
    if (mlbStandingsGame) {
        console.log('Calling game instance submitTeamGuess method');
        mlbStandingsGame.submitTeamGuess(teamId);
    } else {
        console.error('mlbStandingsGame instance not found!');
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