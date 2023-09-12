// Global variables for the counter and timer
let timer;
let isRunning = false;
let work = true;
let workTime = 25 * 60; // Default work time in seconds
let breakTime = 5 * 60; // Default break time in seconds
let currentTime = workTime; // Current time (initialized to work time)
let workElement = document.getElementById("work");
let breakElement = document.getElementById("break");
let playButton = document.getElementById("play");
let resetButton = document.getElementById("reset");
resetButton.style.display = "none";

// Function to update the text color of the current period (work or break)
function updateTextColor() {
  if (work) {
    breakElement.style.color = "white";
    workElement.style.color = "lightgreen";
  } else {
    workElement.style.color = "white";
    breakElement.style.color = "lightgreen";
  }
}

// Function to update the timer display
function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to start/stop the timer
function startTimer() {
  resetButton.style.display = "inline";
  playButton.style.display = "none";
  document.getElementById("form").style.display = "none";
  if (!isRunning) {
    timer = setInterval(function () {
      if (currentTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        work = !work; // Toggle work/break mode
        updateTextColor();
        startCountdown();
      } else {
        currentTime--;
        updateTimerDisplay();
      }
    }, 1000);
    isRunning = true;
  } else {
    clearInterval(timer);
    isRunning = false;
  }
}

// Function to reset the timer
function reset() {
  playButton.style.display = "inline";
  resetButton.style.display = "none";
  clearInterval(timer);
  isRunning = false;
  currentTime = workTime;
  updateTimerDisplay();
  document.getElementById("form").style.display = "none";
}

// Function to configure the timer
function configure() {
  console.log("OK");
  reset();
  const timeInput = document.getElementById("worktime");
  const breaktimeInput = document.getElementById("breaktime");
  timeInput.value = currentTime;
  breaktimeInput.value = breakTime;
  document.getElementById("form").style.display = "block";
}

// Function to update the timer configuration
function updateConfigure() {
  const timeInput = document.getElementById("worktime");
  const breaktimeInput = document.getElementById("breaktime");
  const newTime = parseInt(timeInput.value, 10);
  const newBreakTime = parseInt(breaktimeInput.value, 10);
  if (!isNaN(newTime) && newTime > 0 && !isNaN(newBreakTime) && newBreakTime > 0) {
    currentTime = newTime;
    workTime = newTime;
    breakTime = newBreakTime;
    updateTimerDisplay();
    document.getElementById("form").style.display = "none";
  }
}

// Function to start the break countdown timer
function startCountdown() {
  if (!isRunning) {
    const countdownTime = breakTime;
    currentTime = countdownTime;
    updateTimerDisplay();
    timer = setInterval(function () {
      if (currentTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        work = true; // Return to work mode
        updateTextColor();
        currentTime = workTime;
        updateTimerDisplay();
        startTimer(); // Start the main timer
      } else {
        currentTime--;
        updateTimerDisplay();
      }
    }, 1000);
    isRunning = true;
  }
}

updateTimerDisplay();
updateTextColor();
