
export function displayPuzzle(currentPuzzle, themePuzzles) {
    if (currentPuzzle < themePuzzles.length) {
        document.getElementById("puzzle").textContent = themePuzzles[currentPuzzle].question;
        document.getElementById("questImage").src = themePuzzles[currentPuzzle].image;
        document.getElementById("answer").value = "";
        document.getElementById("answer").disabled = false;
        document.getElementById("feedbackSection").classList.add("d-none");
        document.getElementById("hintSection").classList.add("d-none");
        document.getElementById("answer").focus();
        updateProgressBar(currentPuzzle, themePuzzles.length);
    } else {
        celebrate();
    }
}

function updateProgressBar(currentPuzzle, totalPuzzles) {
    const progress = (currentPuzzle / totalPuzzles) * 100;
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);
}

function celebrate() {
    document.querySelector(".card-body").innerHTML = `
        <h1 class="card-title mb-4">Congratulations!</h1>
        <p class="card-text">You've completed the Quest!</p>
        <img src="https://picsum.photos/seed/trophy/200" alt="Trophy" class="quest-image">
    `;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
