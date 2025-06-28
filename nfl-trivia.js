// NFL Trivia Game Implementation
class NFLTriviaGame {
    constructor() {
        this.questions = [
            {
                question: "Which team won Super Bowl LVII (2023)?",
                answers: ["Kansas City Chiefs", "Philadelphia Eagles", "Cincinnati Bengals", "Buffalo Bills"],
                correct: 0
            },
            {
                question: "Who holds the NFL record for most career passing yards?",
                answers: ["Tom Brady", "Peyton Manning", "Drew Brees", "Brett Favre"],
                correct: 0
            },
            {
                question: "Which quarterback was drafted first overall in 2021?",
                answers: ["Zach Wilson", "Trey Lance", "Trevor Lawrence", "Justin Fields"],
                correct: 2
            },
            {
                question: "How many teams make the NFL playoffs each season (as of 2023)?",
                answers: ["12", "14", "16", "18"],
                correct: 1
            },
            {
                question: "Which team has won the most Super Bowl titles?",
                answers: ["Dallas Cowboys", "Pittsburgh Steelers", "New England Patriots", "San Francisco 49ers"],
                correct: 1
            },
            {
                question: "Who won NFL MVP in the 2022 season?",
                answers: ["Josh Allen", "Patrick Mahomes", "Lamar Jackson", "Aaron Rodgers"],
                correct: 1
            },
            {
                question: "Which running back rushed for over 2,000 yards in the 2022 season?",
                answers: ["Derrick Henry", "Jonathan Taylor", "Nick Chubb", "None of them"],
                correct: 3
            },
            {
                question: "What is the maximum number of players allowed on an NFL roster during the regular season?",
                answers: ["50", "53", "55", "60"],
                correct: 1
            },
            {
                question: "Which wide receiver was known as 'Megatron'?",
                answers: ["Randy Moss", "Calvin Johnson", "Terrell Owens", "Jerry Rice"],
                correct: 1
            },
            {
                question: "How many yards is a football field from goal line to goal line?",
                answers: ["100", "110", "120", "130"],
                correct: 0
            },
            {
                question: "Which team moved to Las Vegas in 2020?",
                answers: ["Los Angeles Chargers", "Oakland Raiders", "San Diego Chargers", "St. Louis Rams"],
                correct: 1
            },
            {
                question: "Who is the all-time leader in career touchdown passes?",
                answers: ["Tom Brady", "Peyton Manning", "Aaron Rodgers", "Drew Brees"],
                correct: 0
            },
            {
                question: "Which quarterback has thrown for the most yards in a single season?",
                answers: ["Peyton Manning", "Tom Brady", "Drew Brees", "Dan Marino"],
                correct: 0
            },
            {
                question: "What year was the first Super Bowl played?",
                answers: ["1966", "1967", "1968", "1969"],
                correct: 1
            },
            {
                question: "Which defensive player won Super Bowl MVP in 2016 (Broncos vs Panthers)?",
                answers: ["Von Miller", "Demarcus Ware", "Aqib Talib", "Chris Harris Jr."],
                correct: 0
            },
            {
                question: "How many points is a touchdown worth?",
                answers: ["6", "7", "8", "3"],
                correct: 0
            },
            {
                question: "Which team completed the only perfect season in NFL history (including playoffs)?",
                answers: ["1985 Chicago Bears", "1972 Miami Dolphins", "2007 New England Patriots", "1976 Pittsburgh Steelers"],
                correct: 1
            },
            {
                question: "Who holds the record for most rushing yards in a single game?",
                answers: ["Adrian Peterson", "Barry Sanders", "Eric Dickerson", "O.J. Simpson"],
                correct: 0
            },
            {
                question: "Which city hosted Super Bowl LVII in 2023?",
                answers: ["Los Angeles", "Phoenix", "Miami", "Las Vegas"],
                correct: 1
            },
            {
                question: "What does 'NFL' stand for?",
                answers: ["National Football League", "North American Football League", "National Federation League", "New Football League"],
                correct: 0
            },
            {
                question: "Which team drafted Aaron Donald first overall?",
                answers: ["Los Angeles Rams", "St. Louis Rams", "Pittsburgh Steelers", "Tampa Bay Buccaneers"],
                correct: 1
            },
            {
                question: "How many divisions are in each NFL conference?",
                answers: ["3", "4", "5", "6"],
                correct: 1
            },
            {
                question: "Which quarterback led the greatest comeback in Super Bowl history (Super Bowl LI)?",
                answers: ["Tom Brady", "Peyton Manning", "Joe Montana", "Aaron Rodgers"],
                correct: 0
            },
            {
                question: "What is the name of the trophy awarded to the Super Bowl winner?",
                answers: ["Lombardi Trophy", "Halas Trophy", "Davis Trophy", "Championship Trophy"],
                correct: 0
            },
            {
                question: "Which team has the longest playoff drought as of 2023?",
                answers: ["New York Jets", "Cleveland Browns", "Detroit Lions", "Buffalo Bills"],
                correct: 0
            },
            {
                question: "Who was the youngest quarterback to win a Super Bowl?",
                answers: ["Tom Brady", "Ben Roethlisberger", "Russell Wilson", "Patrick Mahomes"],
                correct: 1
            },
            {
                question: "Which running back holds the single-season rushing record?",
                answers: ["Eric Dickerson", "O.J. Simpson", "Barry Sanders", "Adrian Peterson"],
                correct: 0
            },
            {
                question: "How many teams are in the NFL?",
                answers: ["30", "32", "34", "36"],
                correct: 1
            },
            {
                question: "Which team is known as 'America's Team'?",
                answers: ["New England Patriots", "Green Bay Packers", "Dallas Cowboys", "Pittsburgh Steelers"],
                correct: 2
            },
            {
                question: "What is the maximum time allowed for a play clock in the NFL?",
                answers: ["25 seconds", "30 seconds", "35 seconds", "40 seconds"],
                correct: 3
            },
            {
                question: "Which coach has won the most Super Bowl titles?",
                answers: ["Vince Lombardi", "Chuck Noll", "Bill Belichick", "Joe Gibbs"],
                correct: 2
            },
            {
                question: "What position did Tom Brady play in college besides quarterback?",
                answers: ["Punter", "Kicker", "Wide Receiver", "Catcher (Baseball)"],
                correct: 3
            },
            {
                question: "Which team scored the most points in a single NFL season?",
                answers: ["2007 New England Patriots", "2013 Denver Broncos", "1984 Miami Dolphins", "2011 Green Bay Packers"],
                correct: 1
            },
            {
                question: "Who is the only player to win Super Bowl MVP for two different teams?",
                answers: ["Joe Montana", "Peyton Manning", "Tom Brady", "No one has done this"],
                correct: 2
            },
            {
                question: "Which team has the most Hall of Fame players?",
                answers: ["Chicago Bears", "Green Bay Packers", "Dallas Cowboys", "Pittsburgh Steelers"],
                correct: 0
            },
            {
                question: "What is the record for most interceptions thrown in a single season?",
                answers: ["28", "30", "32", "35"],
                correct: 1
            },
            {
                question: "Which quarterback has the most career wins (regular season + playoffs)?",
                answers: ["Tom Brady", "Peyton Manning", "Brett Favre", "Joe Montana"],
                correct: 0
            },
            {
                question: "How many minutes are in each quarter of an NFL game?",
                answers: ["12", "15", "18", "20"],
                correct: 1
            },
            {
                question: "Which team has never appeared in a Super Bowl?",
                answers: ["Houston Texans", "Jacksonville Jaguars", "Cleveland Browns", "All of the above"],
                correct: 3
            },
            {
                question: "Who holds the record for most receiving yards in a single season?",
                answers: ["Jerry Rice", "Calvin Johnson", "Julio Jones", "Antonio Brown"],
                correct: 1
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.gameQuestions = [];
        this.gameOver = false;
        this.selectedAnswer = null;
        this.questionsPerGame = 10;
    }
    
    initialize() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.gameOver = false;
        this.selectedAnswer = null;
        
        // Select random questions for this game
        this.gameQuestions = this.getRandomQuestions(this.questionsPerGame);
        
        this.displayQuestion();
        this.updateScore();
        this.updateQuestionNumber();
        
        // Hide next button initially
        document.getElementById('next-question-btn').style.display = 'none';
        
        hideMessage('trivia-message');
    }
    
    getRandomQuestions(count) {
        const shuffled = shuffleArray(this.questions);
        return shuffled.slice(0, count);
    }
    
    displayQuestion() {
        if (this.currentQuestionIndex >= this.gameQuestions.length) {
            this.endGame();
            return;
        }
        
        const currentQuestion = this.gameQuestions[this.currentQuestionIndex];
        document.getElementById('trivia-question').textContent = currentQuestion.question;
        
        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';
        
        currentQuestion.answers.forEach((answer, index) => {
            const answerButton = document.createElement('button');
            answerButton.className = 'answer-btn';
            answerButton.textContent = answer;
            answerButton.onclick = () => this.selectAnswer(index);
            answerButton.id = `answer-${index}`;
            
            answersContainer.appendChild(answerButton);
        });
        
        this.selectedAnswer = null;
        document.getElementById('next-question-btn').style.display = 'none';
        hideMessage('trivia-message');
    }
    
    selectAnswer(answerIndex) {
        if (this.selectedAnswer !== null) return; // Already answered
        
        this.selectedAnswer = answerIndex;
        const currentQuestion = this.gameQuestions[this.currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correct;
        
        // Disable all answer buttons and show correct/incorrect
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            btn.disabled = true;
            
            if (index === currentQuestion.correct) {
                btn.classList.add('correct');
            } else if (index === answerIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            this.score++;
            showMessage('trivia-message', 'Correct! 🎉', 'success', 0);
        } else {
            showMessage('trivia-message', `Incorrect. The correct answer was: ${currentQuestion.answers[currentQuestion.correct]}`, 'error', 0);
        }
        
        this.updateScore();
        
        // Show next button or end game
        if (this.currentQuestionIndex < this.gameQuestions.length - 1) {
            document.getElementById('next-question-btn').style.display = 'block';
        } else {
            setTimeout(() => this.endGame(), 2000);
        }
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.updateQuestionNumber();
        
        if (this.currentQuestionIndex < this.gameQuestions.length) {
            this.displayQuestion();
        } else {
            this.endGame();
        }
    }
    
    endGame() {
        this.gameOver = true;
        
        const percentage = Math.round((this.score / this.questionsPerGame) * 100);
        let message = '';
        let messageType = 'info';
        
        if (percentage >= 90) {
            message = `Outstanding! ${this.score}/${this.questionsPerGame} (${percentage}%) - You're an NFL expert! 🏆`;
            messageType = 'success';
        } else if (percentage >= 80) {
            message = `Great job! ${this.score}/${this.questionsPerGame} (${percentage}%) - You know your NFL trivia! 🎯`;
            messageType = 'success';
        } else if (percentage >= 70) {
            message = `Good work! ${this.score}/${this.questionsPerGame} (${percentage}%) - Solid NFL knowledge! 👍`;
            messageType = 'success';
        } else if (percentage >= 60) {
            message = `Not bad! ${this.score}/${this.questionsPerGame} (${percentage}%) - Room for improvement! 📚`;
            messageType = 'info';
        } else {
            message = `${this.score}/${this.questionsPerGame} (${percentage}%) - Time to brush up on your NFL knowledge! 📖`;
            messageType = 'error';
        }
        
        showMessage('trivia-message', message, messageType, 0);
        
        // Hide question and answers
        document.getElementById('trivia-question').textContent = 'Game Complete!';
        document.getElementById('answers-container').innerHTML = '';
        document.getElementById('next-question-btn').style.display = 'none';
    }
    
    updateScore() {
        document.getElementById('trivia-score').textContent = this.score;
    }
    
    updateQuestionNumber() {
        document.getElementById('question-number').textContent = this.currentQuestionIndex + 1;
    }
}

// Global NFL Trivia game instance
let nflTriviaGame = new NFLTriviaGame();

// Initialize the NFL Trivia game
function initializeNFLTrivia() {
    if (!nflTriviaGame) {
        nflTriviaGame = new NFLTriviaGame();
    }
    // Only initialize if not already initialized
    if (nflTriviaGame.gameQuestions.length === 0) {
        nflTriviaGame.initialize();
    }
}

// Start a new NFL Trivia game
function newTriviaGame() {
    nflTriviaGame = new NFLTriviaGame();
    nflTriviaGame.initialize();
}

// Handle next question button
function nextQuestion() {
    if (nflTriviaGame) {
        nflTriviaGame.nextQuestion();
    }
} 