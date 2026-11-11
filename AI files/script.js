// HTML elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answer-container");
const questionCount = document.getElementById("question-count");
const scoreElement = document.getElementById("score");

// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital of Pakistan?",
        answers: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
        correct: "Islamabad"
    },
    {
        question: "Which language is used to style web pages?",
        answers: ["HTML", "CSS", "Python", "C++"],
        correct: "CSS"
    },
    {
        question: "Which language is used to add interactivity to websites?",
        answers: ["JavaScript", "HTML", "SQL", "CSS"],
        correct: "JavaScript"
    },
    {
        question: "How many days are there in a week?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        answers: ["<h6>", "<p>", "<h1>", "<head>"],
        correct: "<h1>"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Start the quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    showQuestion();
}

// Display a question
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(button, answer);
        });

        answersContainer.appendChild(button);
    });
}

// Check the selected answer
function selectAnswer(selectedButton, answer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const answerButtons = answersContainer.querySelectorAll("button");

    answerButtons.forEach((button) => {
        button.disabled = true;

        if (button.textContent === currentQuestion.correct) {
            button.classList.add("correct");
        }
    });

    if (answer === currentQuestion.correct) {
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Display final results
function showResults() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    scoreElement.textContent =
        `You scored ${score} out of ${quizQuestions.length}!`;
}

// Restart the quiz
restartBtn.addEventListener("click", startQuiz);