// DOm Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
    {
        question: "Waa maxay caasimadda Koowaad  Ee Soomaaliya?",
        answers: [
            { text: "Hargeysa", correct: false },
            { text: "Mogadishu", correct: true },
            { text: "Kismayo", correct: false },
            { text: "Baydhabo", correct: false }
        ]
    },
    {
        question: "Webiga ugu dheer Soomaaliya waa kee?",
        answers: [
            { text: "Webiga Jubba", correct: false },
            { text: "Webiga Shabeelle", correct: true },
            { text: "Webiga Dawa", correct: false },
            { text: "Webiga Tana", correct: false }
        ]
    },
    {
        question: "Goorma ayay Soomaaliya xorriyadeeda ka qaadatay Talyaaniga iyo Ingiriiska?",
        answers: [
            { text: "1969", correct: false },
            { text: "1960", correct: true },
            { text: "1950", correct: false },
            { text: "1972", correct: false }
        ]
    },
    {
        question: "Madaxweynihii ugu horreeyay ee Jamhuuriyadda Soomaaliya waa kuma?",
        answers: [
            { text: "Siyaad Barre", correct: false },
            { text: "Aden Cabdulle Osman", correct: true },
            { text: "Hassan Sheikh Mohamud", correct: false },
            { text: "Abdirashid Ali Shermarke", correct: false }
        ]
    },
    {
        question: "Badda Soomaaliya waxaa lagu magacaabaa?",
        answers: [
            { text: "Badweynta Atlaantik", correct: false },
            { text: "Badweynta Hindiya", correct: true },
            { text: "Badweynta Baasifig", correct: false },
            { text: "Badweynta Arctic", correct: false }
        ]
    }
];

// Quiz State vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();


}
 function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.question;
    // todo: explain this  in a second
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.text;
        answerButton.classList.add("answer-btn"); 
        answerButton.dataset.correct = answer.correct;  
        answerButton.addEventListener("click", (event) => selectAnswer(event));
        answersContainer.appendChild(answerButton);
    }

 )};
function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++; 
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}
function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    const scorePercent = (score / quizQuestions.length) * 100;
    if (scorePercent === 100) {
        resultMessage.textContent = "Perfect Score! 🎉";
    }
    else if (scorePercent >= 75) {
        resultMessage.textContent = "Great Job! 👍";
    }
    else if (scorePercent >= 50) {
        resultMessage.textContent = "Good Effort! 🙂";
    }
    else {
        resultMessage.textContent = "Better Luck Next Time! 🙁";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();

}