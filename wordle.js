// Wordle Game Implementation
class WordleGame {
    constructor() {
        this.words = [
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
            'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
            'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY',
            'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD', 'AWARE',
            'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW', 'BENCH',
            'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST',
            'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRIEF',
            'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BURST', 'BUYER', 'CABLE', 'CALIF',
            'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP',
            'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIC', 'CIVIL', 'CLAIM', 'CLASS',
            'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD',
            'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD',
            'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT',
            'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM',
            'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT',
            'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY',
            'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY',
            'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE',
            'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT',
            'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND',
            'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS',
            'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL',
            'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY',
            'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
            'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS',
            'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER',
            'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR',
            'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH',
            'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED',
            'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT',
            'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE',
            'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER',
            'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE',
            'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
            'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPAY', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL',
            'RIVER', 'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE',
            'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE',
            'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT',
            'SHOWN', 'SIDES', 'SIGHT', 'SILLY', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP',
            'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND',
            'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT',
            'SQUAD', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP',
            'STEER', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP',
            'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN',
            'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR',
            'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW',
            'THROW', 'THUMB', 'TIGHT', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH',
            'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED',
            'TRIES', 'TRUCK', 'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'UNCLE',
            'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL',
            'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH',
            'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN',
            'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YOUNG'
        ];
        
        this.currentWord = '';
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.guesses = [];
        this.keyboardKeys = {};
        
        this.keyboard = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];
    }
    
    initialize() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.guesses = [];
        this.keyboardKeys = {};
        
        this.createGrid();
        this.createKeyboard();
        this.updateDisplay();
        
        console.log('Word to guess:', this.currentWord); // For testing
    }
    
    createGrid() {
        const gridElement = document.getElementById('wordle-grid');
        gridElement.innerHTML = '';
        
        for (let row = 0; row < 6; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'wordle-row';
            rowElement.id = `row-${row}`;
            
            for (let col = 0; col < 5; col++) {
                const cellElement = document.createElement('div');
                cellElement.className = 'wordle-cell';
                cellElement.id = `cell-${row}-${col}`;
                rowElement.appendChild(cellElement);
            }
            
            gridElement.appendChild(rowElement);
        }
    }
    
    createKeyboard() {
        const keyboardElement = document.getElementById('keyboard');
        keyboardElement.innerHTML = '';
        
        this.keyboard.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = key.length > 1 ? 'key wide' : 'key';
                keyElement.textContent = key === 'BACKSPACE' ? '⌫' : key;
                keyElement.onclick = () => this.handleKeyPress(key);
                
                this.keyboardKeys[key] = keyElement;
                rowElement.appendChild(keyElement);
            });
            
            keyboardElement.appendChild(rowElement);
        });
    }
    
    handleKeyPress(key) {
        if (this.gameOver) return;
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key.match(/[A-Z]/) && key.length === 1) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol < 5) {
            const cellId = `cell-${this.currentRow}-${this.currentCol}`;
            const cell = document.getElementById(cellId);
            cell.textContent = letter;
            cell.classList.add('filled');
            this.currentCol++;
        }
    }
    
    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const cellId = `cell-${this.currentRow}-${this.currentCol}`;
            const cell = document.getElementById(cellId);
            cell.textContent = '';
            cell.classList.remove('filled');
        }
    }
    
    submitGuess() {
        if (this.currentCol !== 5) {
            showMessage('wordle-message', 'Please enter a 5-letter word!', 'error', 2000);
            return;
        }
        
        const guess = this.getCurrentGuess();
        
        if (!this.words.includes(guess)) {
            showMessage('wordle-message', 'Word not in word list!', 'error', 2000);
            return;
        }
        
        this.checkGuess(guess);
        this.guesses.push(guess);
        
        if (guess === this.currentWord) {
            this.gameWon = true;
            this.gameOver = true;
            showMessage('wordle-message', `Congratulations! You found the word "${this.currentWord}"!`, 'success', 0);
        } else if (this.currentRow === 5) {
            this.gameOver = true;
            showMessage('wordle-message', `Game Over! The word was "${this.currentWord}".`, 'error', 0);
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
        
        this.updateDisplay();
    }
    
    getCurrentGuess() {
        let guess = '';
        for (let col = 0; col < 5; col++) {
            const cellId = `cell-${this.currentRow}-${col}`;
            const cell = document.getElementById(cellId);
            guess += cell.textContent;
        }
        return guess;
    }
    
    checkGuess(guess) {
        const targetLetters = this.currentWord.split('');
        const guessLetters = guess.split('');
        const letterCounts = {};
        
        // Count letters in target word
        targetLetters.forEach(letter => {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        });
        
        // First pass: mark correct positions
        guessLetters.forEach((letter, index) => {
            const cellId = `cell-${this.currentRow}-${index}`;
            const cell = document.getElementById(cellId);
            
            if (letter === targetLetters[index]) {
                cell.classList.add('correct');
                this.updateKeyboard(letter, 'correct');
                letterCounts[letter]--;
            }
        });
        
        // Second pass: mark present letters
        guessLetters.forEach((letter, index) => {
            const cellId = `cell-${this.currentRow}-${index}`;
            const cell = document.getElementById(cellId);
            
            if (!cell.classList.contains('correct')) {
                if (letterCounts[letter] > 0) {
                    cell.classList.add('present');
                    this.updateKeyboard(letter, 'present');
                    letterCounts[letter]--;
                } else {
                    cell.classList.add('absent');
                    this.updateKeyboard(letter, 'absent');
                }
            }
        });
    }
    
    updateKeyboard(letter, status) {
        const keyElement = this.keyboardKeys[letter];
        if (keyElement) {
            // Don't downgrade from correct to present/absent
            if (keyElement.classList.contains('correct')) return;
            if (keyElement.classList.contains('present') && status === 'absent') return;
            
            keyElement.classList.remove('correct', 'present', 'absent');
            keyElement.classList.add(status);
        }
    }
    
    updateDisplay() {
        document.getElementById('attempts').textContent = this.currentRow + (this.gameOver ? 0 : 0);
    }
}

// Global Wordle game instance
let wordleGame = new WordleGame();

// Initialize the Wordle game
function initializeWordle() {
    if (!wordleGame) {
        wordleGame = new WordleGame();
    }
    // Only initialize if the grid is empty (first time or after new game)
    const grid = document.getElementById('wordle-grid');
    if (!grid.children.length) {
        wordleGame.initialize();
    }
}

// Start a new Wordle game
function newWordleGame() {
    wordleGame = new WordleGame();
    wordleGame.initialize();
    hideMessage('wordle-message');
}

// Handle keyboard input for Wordle
function handleWordleKeydown(event) {
    const activeSection = document.querySelector('.section.active');
    if (!activeSection || activeSection.id !== 'wordle') return;
    
    event.preventDefault();
    
    const key = event.key.toUpperCase();
    
    if (key === 'ENTER') {
        wordleGame.handleKeyPress('ENTER');
    } else if (key === 'BACKSPACE') {
        wordleGame.handleKeyPress('BACKSPACE');
    } else if (key.match(/[A-Z]/) && key.length === 1) {
        wordleGame.handleKeyPress(key);
    }
} 