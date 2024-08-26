
function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    element.classList.toggle("d-none", !isVisible);
}

function resetInputField() {
    const answerField = document.getElementById("answer");
    answerField.value = "";
    answerField.disabled = false;
    answerField.focus();
}

function showFeedback(isCorrect, userAnswer) {
    clearExistingTimers();
    const feedbackSection = document.getElementById("feedbackSection");
    const feedbackText = document.getElementById("feedbackText");
    const userAnswerFeedback = document.getElementById("userAnswerFeedback");

    feedbackSection.classList.remove("d-none");

    if (isCorrect) {
        feedbackText.textContent = "Correct! Great job!";
        userAnswerFeedback.textContent = `Your answer: ${userAnswer}`;
    } else {
        feedbackText.textContent = "Oops! Try again!";
        userAnswerFeedback.textContent = `Your answer "${userAnswer}" was not correct.`;
    }
}

function clearExistingTimers() {
    clearTimeout(window.nextButtonTimeout);  // Ensure global scope for these timers
    clearInterval(window.countdownInterval); // Ensure global scope for these intervals
}
