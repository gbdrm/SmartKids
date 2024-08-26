let currentPuzzle = 0;
let soundOn = true;
let themePuzzles = [];
window.nextButtonTimeout = null;
window.countdownInterval = null;

const urlParams = new URLSearchParams(window.location.search);
const selectedTheme = urlParams.get('theme');

if (selectedTheme && puzzles[selectedTheme]) {
    themePuzzles = puzzles[selectedTheme];
    document.querySelector('.card-title').textContent = selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1) + " Quest";
    displayPuzzle(currentPuzzle, themePuzzles);
} else {
    console.error("Selected theme not found in puzzles.");
}

document.getElementById("answer").addEventListener("keyup", function(event) {
    if (event.key === "Enter" && !document.getElementById("answer").disabled) {
        checkAnswer();
    } else if (event.key === "Enter" && document.getElementById("nextQuestionButton").classList.contains("visible")) {
        handleNextButtonClick();
    }
});

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = themePuzzles[currentPuzzle].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        showFeedback(true, userAnswer);
        if (soundOn) document.getElementById("correctSound").play();
        document.getElementById("answer").disabled = true;  // Disable input to prevent double submission
        showNextQuestionButton();
        startAutoClickCountdown();
    } else {
        showFeedback(false, userAnswer);
        if (soundOn) document.getElementById("inCorrectSound").play();
    }
}

function showFeedback(isCorrect, userAnswer) {
    clearTimeout(window.nextButtonTimeout);  // Clear any existing timer
    clearInterval(window.countdownInterval); // Clear any existing interval

    const feedbackSection = document.getElementById("feedbackSection");
    const feedbackText = document.getElementById("feedbackText");
    const userAnswerFeedback = document.getElementById("userAnswerFeedback");
    const autoClickCountdown = document.getElementById("autoClickCountdown");

    feedbackSection.classList.remove("d-none");

    if (isCorrect) {
        feedbackText.textContent = "Correct! Great job!";
        userAnswerFeedback.textContent = `Your answer: ${userAnswer}`;
        autoClickCountdown.textContent = `Auto-proceeding in 3 seconds...`;  // Start countdown only on correct answers
    } else {
        feedbackText.textContent = "Oops! Try again!";
        userAnswerFeedback.textContent = `Your answer "${userAnswer}" was not correct.`;
        autoClickCountdown.textContent = "";  // Clear any countdown text on incorrect answers
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

function showHint() {
    const hintSection = document.getElementById("hintSection");
    const hintText = document.getElementById("hintText");

    hintText.textContent = themePuzzles[currentPuzzle].hint;
    hintSection.classList.remove("d-none");
}

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
