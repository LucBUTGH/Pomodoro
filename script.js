// Variables globales pour le compteur et le minuteur
let timer;
let isRunning = false;
let work = true;
let workTime = 25 * 60; //Pomoro default time in seconds
let breakTime = 5 * 60; //Pomoro default break time in seconds
let currentTime = workTime; //Current time (intialized at work time)
let workElement = document.getElementById("work")
let breakElement = document.getElementById("break")
let playButton = document.getElementById("play")
let resetButton = document.getElementById("reset")
resetButton.style.display = "none";

//Function to color current period's text (work or break)
function CSS(){
    if(work){
      breakElement.style.color = "white";
      workElement.style.color = "lightgreen";
    }else{
      workElement.style.color = "white";
      breakElement.style.color = "lightgreen";
    }
}


// Function to update the timer display
function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}



// Function to start/stop the timer
function startTimer() {
  resetButton.style.display = "inline"
  playButton.style.display = "none";
    document.getElementById("form").style.display = "none";
    if (!isRunning) {
        timer = setInterval(function () {
        if (currentTime <= 0) {
            clearInterval(timer);
            isRunning = false
            work = false;
            CSS();
            startCountdown(); //Start the countdown
        } else {
            currentTime--;
            updateTimer();
        }
      }, 1000);
      isRunning = true;
    } else {
      clearInterval(timer);
      isRunning = false;
    }
  }

//Function to reset the timer
function reset() {
  playButton.style.display = "inline"
  resetButton.style.display = "none";
    clearInterval(timer);
    isRunning = false;
    currentTime = workTime;
    updateTimer();
    document.getElementById("form").style.display = "none";
}

//Function to set up the work time. The break time will be calculated according to work time. (20% of work time)
function configure() {
  console.log("OK");
    reset();
    const timeInput = document.getElementById("time");
    timeInput.value = currentTime;
    document.getElementById("form").style.display = "block";
}

//Function to save the configuration
function updateConfigure() {
  const timeInput = document.getElementById("time");
  const newTime = parseInt(timeInput.value, 10);
  if (!isNaN(newTime) && newTime > 0) {
    currentTime = newTime;
    workTime = newTime;
    breakTime = newTime;
    updateTimer();
    document.getElementById("form").style.display = "none";
  }
}

//Function to start the break timer
function startCountdown() {
    if (!isRunning) {
        const countdownTime = Math.floor(workTime / 5); //20% work time
        currentTime = countdownTime; //Update the current time with the countdown
        updateTimer();
        timer = setInterval(function () {
        if (currentTime <= 0) {
            clearInterval(timer);
            isRunning = false;
            work = true; // Back to work mode
            CSS();
            currentTime = workTime;
            updateTimer();
            startTimer(); //Start the main timer
        } else {
            currentTime--;
            updateTimer();
        }
      }, 1000);  
      isRunning = true;
    }
  }

updateTimer();
CSS();
