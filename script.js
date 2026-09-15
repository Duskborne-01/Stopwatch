const timerEl = document.getElementById("timer");
const timeMainEl = document.querySelector(".time-main");
const timeMsEl = document.querySelector(".time-ms");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function updateButtons(isRunning) {
    startButtonEl.disabled = isRunning;
    stopButtonEl.disabled = !isRunning;
}

function updateDisplay() {
    const totalMilliseconds = Math.max(0, elapsedTime);
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    timeMainEl.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    timeMsEl.textContent = `.${String(milliseconds).padStart(2, "0")}`;
}

function startTimer() {
    if (timerInterval) return;

    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);

    updateButtons(true);
}

function stopTimer() {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;
    updateButtons(false);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    elapsedTime = 0;
    updateDisplay();
    updateButtons(false);
}

startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);

updateDisplay();
