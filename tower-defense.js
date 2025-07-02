// Tower Defense Game
class TowerDefenseGame {
    constructor() {
        this.gold = 50;
        this.baseHealth = 100;
        this.currentTurn = 1;
        this.maxTurns = 5;
        this.towers = {
            path1: false,
            path2: false,
            path3: false,
            path4: false
        };
        this.enemies = [];
        this.gameOver = false;
        this.gameWon = false;
        this.towerCost = 20;
        this.towerDamage = 10;
        this.enemyHealth = 20;
        this.enemyDamage = 20;
    }

    initialize() {
        this.updateDisplay();
        this.updateButtons();
        this.showMessage('Welcome to Tower Defense! Build towers to defend your base.', 'info');
    }

    // Build a tower on the specified path
    buildTower(pathNumber) {
        const pathKey = `path${pathNumber}`;
        
        if (this.gold < this.towerCost) {
            this.showMessage('Not enough gold to build a tower!', 'error');
            return;
        }
        
        if (this.towers[pathKey]) {
            this.showMessage('There is already a tower on this path!', 'error');
            return;
        }
        
        this.gold -= this.towerCost;
        this.towers[pathKey] = true;
        this.updateDisplay();
        this.updateButtons();
        this.showMessage(`Tower built on Path ${pathNumber}!`, 'success');
    }

    // Start the next turn
    nextTurn() {
        if (this.gameOver) return;
        
        // Spawn new enemies
        this.spawnEnemies();
        
        // Tower attack phase
        this.towerAttack();
        
        // Enemy movement phase
        this.moveEnemies();
        
        // Check for base damage
        this.checkBaseDamage();
        
        // Advance turn
        this.currentTurn++;
        
        // Check win/loss conditions
        this.checkGameEnd();
        
        this.updateDisplay();
        this.updateButtons();
    }

    spawnEnemies() {
        if (this.currentTurn === 1) {
            // Turn 1: 1 enemy at Path 4
            this.enemies.push({ position: 4, health: this.enemyHealth, id: Date.now() });
        } else if (this.currentTurn >= 2) {
            // Turn 2+: 2 enemies (one at Path 4, one at Path 3)
            this.enemies.push(
                { position: 4, health: this.enemyHealth, id: Date.now() },
                { position: 3, health: this.enemyHealth, id: Date.now() + 1 }
            );
        }
    }

    towerAttack() {
        // Check each tower and attack closest enemy on its path or further
        for (let pathNum = 1; pathNum <= 4; pathNum++) {
            const pathKey = `path${pathNum}`;
            if (this.towers[pathKey]) {
                // Find closest enemy on this path or further from base
                let targetEnemy = null;
                let closestPosition = 5; // Start beyond the grid
                
                for (let enemy of this.enemies) {
                    if (enemy.position >= pathNum && enemy.position < closestPosition) {
                        targetEnemy = enemy;
                        closestPosition = enemy.position;
                    }
                }
                
                // Attack the target enemy
                if (targetEnemy) {
                    targetEnemy.health -= this.towerDamage;
                    if (targetEnemy.health <= 0) {
                        this.enemies = this.enemies.filter(e => e.id !== targetEnemy.id);
                        this.gold += 5; // Reward for killing enemy
                    }
                }
            }
        }
    }

    moveEnemies() {
        // Move all remaining enemies one step closer to base
        for (let enemy of this.enemies) {
            enemy.position--;
        }
    }

    checkBaseDamage() {
        // Check for enemies that reached the base (position 0)
        const baseAttackers = this.enemies.filter(e => e.position <= 0);
        for (let attacker of baseAttackers) {
            this.baseHealth -= this.enemyDamage;
            this.showMessage(`Enemy reached your base! -${this.enemyDamage} health`, 'error');
        }
        
        // Remove enemies that attacked the base
        this.enemies = this.enemies.filter(e => e.position > 0);
    }

    checkGameEnd() {
        if (this.baseHealth <= 0) {
            this.gameOver = true;
            this.gameWon = false;
            this.showMessage('Game Over! Your base was destroyed!', 'error');
        } else if (this.currentTurn > this.maxTurns) {
            this.gameOver = true;
            this.gameWon = true;
            this.showMessage('Victory! You survived all 5 turns!', 'success');
        }
    }

    updateDisplay() {
        // Update stats
        document.getElementById('td-gold').textContent = this.gold;
        document.getElementById('td-base-health').textContent = this.baseHealth;
        document.getElementById('td-current-turn').textContent = this.currentTurn;
        
        // Update grid
        this.updateGrid();
        
        // Update progress bar
        const healthPercent = Math.max(0, (this.baseHealth / 100) * 100);
        const healthBar = document.getElementById('td-health-bar');
        if (healthBar) {
            healthBar.style.width = `${healthPercent}%`;
            healthBar.className = `health-bar ${healthPercent > 50 ? 'healthy' : healthPercent > 25 ? 'warning' : 'danger'}`;
        }
    }

    updateGrid() {
        // Clear grid
        for (let i = 0; i <= 4; i++) {
            const cell = document.getElementById(`td-cell-${i}`);
            if (cell) {
                cell.innerHTML = '';
                cell.className = `td-cell ${i === 0 ? 'base-cell' : 'path-cell'}`;
            }
        }
        
        // Add base
        const baseCell = document.getElementById('td-cell-0');
        if (baseCell) {
            baseCell.innerHTML = '<div class="base-icon">🏠</div><div class="cell-label">Base</div>';
        }
        
        // Add towers
        for (let pathNum = 1; pathNum <= 4; pathNum++) {
            const pathKey = `path${pathNum}`;
            if (this.towers[pathKey]) {
                const cell = document.getElementById(`td-cell-${pathNum}`);
                if (cell) {
                    cell.innerHTML += '<div class="tower-icon">🗼</div>';
                    cell.classList.add('has-tower');
                }
            }
        }
        
        // Add enemies
        for (let enemy of this.enemies) {
            if (enemy.position >= 1 && enemy.position <= 4) {
                const cell = document.getElementById(`td-cell-${enemy.position}`);
                if (cell) {
                    const enemyDiv = document.createElement('div');
                    enemyDiv.className = 'enemy-icon';
                    enemyDiv.innerHTML = '👹';
                    enemyDiv.title = `Health: ${enemy.health}`;
                    cell.appendChild(enemyDiv);
                }
            }
        }
        
        // Add path labels
        for (let i = 1; i <= 4; i++) {
            const cell = document.getElementById(`td-cell-${i}`);
            if (cell && !cell.querySelector('.cell-label')) {
                const label = document.createElement('div');
                label.className = 'cell-label';
                label.textContent = `Path ${i}`;
                cell.appendChild(label);
            }
        }
    }

    updateButtons() {
        // Update tower build buttons
        for (let pathNum = 1; pathNum <= 4; pathNum++) {
            const button = document.getElementById(`td-build-${pathNum}`);
            if (button) {
                const pathKey = `path${pathNum}`;
                const canBuild = !this.towers[pathKey] && this.gold >= this.towerCost && !this.gameOver;
                button.disabled = !canBuild;
                button.textContent = this.towers[pathKey] ? 'Tower Built' : `Build Tower (${this.towerCost}g)`;
            }
        }
        
        // Update next turn button
        const nextTurnBtn = document.getElementById('td-next-turn');
        if (nextTurnBtn) {
            nextTurnBtn.disabled = this.gameOver;
            if (this.gameOver) {
                nextTurnBtn.textContent = this.gameWon ? 'You Won!' : 'Game Over';
            } else {
                nextTurnBtn.textContent = this.currentTurn <= this.maxTurns ? `Next Turn (${this.currentTurn}/${this.maxTurns})` : 'Game Complete';
            }
        }
        
        // Update restart button visibility
        const restartBtn = document.getElementById('td-restart');
        if (restartBtn) {
            restartBtn.style.display = this.gameOver ? 'inline-block' : 'none';
        }
    }

    restart() {
        this.gold = 50;
        this.baseHealth = 100;
        this.currentTurn = 1;
        this.towers = {
            path1: false,
            path2: false,
            path3: false,
            path4: false
        };
        this.enemies = [];
        this.gameOver = false;
        this.gameWon = false;
        
        this.updateDisplay();
        this.updateButtons();
        this.showMessage('New game started! Defend your base!', 'info');
    }

    showMessage(message, type) {
        const messageElement = document.getElementById('td-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `game-message ${type}`;
            messageElement.style.display = 'block';
            
            // Auto-hide after 3 seconds unless it's game over
            if (!this.gameOver) {
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 3000);
            }
        }
    }
}

// Global game instance
let towerDefenseGame = null;

// Initialize game when section is opened
function initializeTowerDefense() {
    if (!towerDefenseGame) {
        towerDefenseGame = new TowerDefenseGame();
        towerDefenseGame.initialize();
    }
}

// Tower building functions
function buildTower(pathNumber) {
    if (towerDefenseGame) {
        towerDefenseGame.buildTower(pathNumber);
    }
}

// Next turn function
function nextTurn() {
    if (towerDefenseGame) {
        towerDefenseGame.nextTurn();
    }
}

// Restart function
function restartTowerDefense() {
    if (towerDefenseGame) {
        towerDefenseGame.restart();
    }
}

// Auto-initialize if page loads directly to tower defense
if (window.location.pathname === '/tower-defense' || window.location.hash === '#tower-defense') {
    document.addEventListener('DOMContentLoaded', initializeTowerDefense);
} 