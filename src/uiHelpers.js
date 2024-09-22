
export function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    element.classList.toggle("d-none", !isVisible);
}

export function resetInputField() {
    const answerField = document.getElementById("answer");
    answerField.value = "";
    answerField.disabled = false;
    answerField.focus();
}

export function showFeedback(isCorrect, userAnswer) {
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

export function clearExistingTimers() {
    clearTimeout(window.nextButtonTimeout);  // Ensure global scope for these timers
    clearInterval(window.countdownInterval); // Ensure global scope for these intervals
}
