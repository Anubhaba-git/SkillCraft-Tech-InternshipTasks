let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 100);
    }
    isRunning = !isRunning;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((elapsedTime % 1000) / 100);
    document.getElementById("display").innerText = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${milliseconds}`;
}

function lapTime() {
    if (!isRunning) return;
    let lapItem = document.createElement("div");
    lapItem.innerText = document.getElementById("display").innerText;
    document.getElementById("laps").appendChild(lapItem);
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}
