class ColorMemoryGame {
    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.currentStep = 0;
        this.score = 0;
        this.isPlaying = false;
        this.isShowingSequence = false;
        this.gameSpeed = 800; // milliseconds between flashes
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.maxScore = parseInt(localStorage.getItem('colorMemoryHighScore')) || 0;
    }

    async initialize() {
        this.updateDisplay();
        this.setupEventListeners();
        this.showMessage('color-memory-message', 'Press "Start Game" to begin!', 'info', 0);
    }

    setupEventListeners() {
        // Add click listeners to color buttons
        this.colors.forEach(color => {
            const button = document.getElementById(`color-${color}`);
            if (button) {
                button.addEventListener('click', () => this.handleColorClick(color));
            }
        });
    }

    startGame() {
        this.sequence = [];
        this.playerSequence = [];
        this.currentStep = 0;
        this.score = 0;
        this.isPlaying = true;
        this.gameSpeed = 800;
        
        this.updateDisplay();
        this.hideMessage('color-memory-message');
        this.addToSequence();
    }

    addToSequence() {
        // Add random color to sequence
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.sequence.push(randomColor);
        this.playerSequence = [];
        this.currentStep = 0;
        
        // Show the sequence
        setTimeout(() => {
            this.showSequence();
        }, 500);
    }

    async showSequence() {
        this.isShowingSequence = true;
        this.disableButtons();
        
        this.showMessage('color-memory-message', 'Watch the sequence...', 'info', 0);
        
        for (let i = 0; i < this.sequence.length; i++) {
            await this.flashColor(this.sequence[i]);
            await this.wait(this.gameSpeed);
        }
        
        this.isShowingSequence = false;
        this.enableButtons();
        this.showMessage('color-memory-message', 'Repeat the sequence!', 'info', 0);
    }

    flashColor(color) {
        return new Promise(resolve => {
            const button = document.getElementById(`color-${color}`);
            if (button) {
                button.classList.add('flash');
                // Play sound effect (visual feedback)
                setTimeout(() => {
                    button.classList.remove('flash');
                    resolve();
                }, 300);
            } else {
                resolve();
            }
        });
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleColorClick(color) {
        if (!this.isPlaying || this.isShowingSequence) return;

        this.playerSequence.push(color);
        this.flashColor(color);

        // Check if the clicked color matches the sequence
        if (this.playerSequence[this.currentStep] !== this.sequence[this.currentStep]) {
            this.gameOver();
            return;
        }

        this.currentStep++;

        // Check if player completed the current sequence
        if (this.currentStep === this.sequence.length) {
            this.score++;
            this.updateDisplay();
            
            // Check for high score
            if (this.score > this.maxScore) {
                this.maxScore = this.score;
                localStorage.setItem('colorMemoryHighScore', this.maxScore.toString());
                this.showMessage('color-memory-message', `New High Score! Level ${this.score}`, 'success', 2000);
            } else {
                this.showMessage('color-memory-message', `Level ${this.score} Complete!`, 'success', 1500);
            }

            // Increase difficulty slightly
            if (this.gameSpeed > 400) {
                this.gameSpeed -= 25;
            }

            // Add next color to sequence after delay
            setTimeout(() => {
                this.addToSequence();
            }, 1500);
        }
    }

    gameOver() {
        this.isPlaying = false;
        this.disableButtons();
        
        let message = `Game Over! Final Score: ${this.score}`;
        if (this.score === this.maxScore && this.score > 0) {
            message += ' (New High Score!)';
        }
        
        this.showMessage('color-memory-message', message, 'error', 0);
    }

    disableButtons() {
        this.colors.forEach(color => {
            const button = document.getElementById(`color-${color}`);
            if (button) {
                button.style.pointerEvents = 'none';
                button.style.opacity = '0.6';
            }
        });
    }

    enableButtons() {
        this.colors.forEach(color => {
            const button = document.getElementById(`color-${color}`);
            if (button) {
                button.style.pointerEvents = 'auto';
                button.style.opacity = '1';
            }
        });
    }

    updateDisplay() {
        const scoreElement = document.getElementById('color-memory-score');
        const highScoreElement = document.getElementById('color-memory-high-score');
        
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
        if (highScoreElement) {
            highScoreElement.textContent = this.maxScore;
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
async function initializeColorMemory() {
    window.colorMemoryGame = new ColorMemoryGame();
    await window.colorMemoryGame.initialize();
}

// New game function
async function newColorMemoryGame() {
    await window.colorMemoryGame.startGame();
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeColorMemory); 