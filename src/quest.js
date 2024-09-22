import { puzzles } from "./puzzles.js";
import { displayPuzzle } from "./puzzleLogic.js";
import { showFeedback } from "./uiHelpers.js";

let currentPuzzle = 0;
let soundOn = true;
let themePuzzles = [];
window.nextButtonTimeout = null;
window.countdownInterval = null;
let enterPressed = false;

const urlParams = new URLSearchParams(window.location.search);
const selectedTheme = urlParams.get('theme');

if (selectedTheme && puzzles[selectedTheme]) {
    themePuzzles = puzzles[selectedTheme];
    document.querySelector('.card-title').textContent = selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1) + " Quest";
    displayPuzzle(currentPuzzle, themePuzzles);
} else {
    console.error("Selected theme not found in puzzles.");
}

document.getElementById("answer").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !document.getElementById("answer").disabled) {
        event.preventDefault(); // Prevent the default action
        if (!enterPressed) {
            enterPressed = true; // Prevent multiple triggers
            checkAnswer();
            setTimeout(() => enterPressed = false, 300); // Reset after a short delay
        }
    }
});

document.addEventListener("keydown", function(event) {
    const nextButton = document.getElementById("nextQuestionButton");
    if (nextButton && nextButton.classList.contains("visible") && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault(); // Prevent the default action
        if (!enterPressed) {
            enterPressed = true; // Prevent multiple triggers
            handleNextButtonClick();
            setTimeout(() => enterPressed = false, 300); // Reset after a short delay
        }
    }
});

document.getElementById('submitAnswerButton').addEventListener('click', checkAnswer);
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = themePuzzles[currentPuzzle].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        showFeedback(true, userAnswer);
        if (soundOn) document.getElementById("correctSound").play();
        document.getElementById("answer").disabled = true;  // Disable input to prevent double submission
        showNextQuestionButton();
        document.getElementById("nextQuestionButton").focus();  // Focus on the "Next Question" button
        startAutoClickCountdown();
    } else {
        showFeedback(false, userAnswer);
        if (soundOn) document.getElementById("inCorrectSound").play();
    }
}

function startAutoClickCountdown() {
    const autoClickCountdown = document.getElementById("autoClickCountdown");
    let countdown = 3;

    window.countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            autoClickCountdown.textContent = `Auto-proceeding in ${countdown} seconds...`;
        } else {
            clearInterval(window.countdownInterval);
        }
    }, 1000);

    window.nextButtonTimeout = setTimeout(() => {
        hideNextQuestionButton();
        nextQuestion();
    }, 3000);
}

function nextQuestion() {
    clearExistingTimers();
    hideNextQuestionButton();
    currentPuzzle++;
    displayPuzzle(currentPuzzle, themePuzzles);
}

function showNextQuestionButton() {
    const nextButton = document.getElementById("nextQuestionButton");
    nextButton.classList.add("visible");
    nextButton.classList.remove("d-none");

    nextButton.addEventListener("click", handleNextButtonClick);
}

function handleNextButtonClick() {
    clearTimeout(window.nextButtonTimeout);  // Clear the auto timeout to prevent double progression
    hideNextQuestionButton();
    nextQuestion();
}

function hideNextQuestionButton() {
    const nextButton = document.getElementById("nextQuestionButton");
    nextButton.classList.remove("visible");
    nextButton.classList.add("d-none");
    nextButton.removeEventListener("click", handleNextButtonClick);
}

document.getElementById('hintButton').addEventListener('click', showHint);
function showHint() {
    const hintSection = document.getElementById("hintSection");
    const hintText = document.getElementById("hintText");

    hintText.textContent = themePuzzles[currentPuzzle].hint;
    hintSection.classList.remove("d-none");
}

document.getElementById('soundToggle').addEventListener('click', toggleSound);
function toggleSound() {
    soundOn = !soundOn;
    const soundToggle = document.getElementById("soundToggle");
    soundToggle.textContent = soundOn ? "Sound On" : "Sound Off";
    soundToggle.classList.toggle("btn-info");
    soundToggle.classList.toggle("btn-secondary");
}

function clearExistingTimers() {
    clearTimeout(window.nextButtonTimeout);
    clearInterval(window.countdownInterval);
}
