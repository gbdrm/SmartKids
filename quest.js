
let currentPuzzle = 0;
let soundOn = true;
let themePuzzles = [];
window.nextButtonTimeout = null;  // Set these globally for accessibility
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
    }
});

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = themePuzzles[currentPuzzle].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        showFeedback(true, userAnswer);
        if (soundOn) document.getElementById("correctSound").play();
        document.getElementById("answer").disabled = true;  // Disable input to prevent double submission
        startAutoClickCountdown();
    } else {
        showFeedback(false, userAnswer);
        if (soundOn) document.getElementById("inCorrectSound").play();
    }
}

function startAutoClickCountdown() {
    const autoClickCountdown = document.getElementById("autoClickCountdown");
    let countdown = 3;
    autoClickCountdown.textContent = `Auto-proceeding in ${countdown} seconds...`;

    window.countdownInterval = setInterval(() => {
        countdown--;
        autoClickCountdown.textContent = `Auto-proceeding in ${countdown} seconds...`;
        if (countdown === 0) {
            clearInterval(window.countdownInterval);
        }
    }, 1000);

    window.nextButtonTimeout = setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
    clearExistingTimers();
    currentPuzzle++;
    displayPuzzle(currentPuzzle, themePuzzles);
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
