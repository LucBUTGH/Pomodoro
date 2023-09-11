// Variables globales pour le compteur et le minuteur
let timer;
let isRunning = false;
let work = true;
let workTime = 25 * 60; // 25 minutes en secondes
let breakTime = 5 * 60; // 5 minutes en secondes
let currentTime = workTime; // Temps actuel (initialisé au temps de travail par défaut)
let workElement = document.getElementById("work")
let breakElement = document.getElementById("break")
let playButton = document.getElementById("play")
let resetButton = document.getElementById("reset")
resetButton.style.display = "none";


function CSS(){
    if(work){
      workElement.style.color = "lightgreen";
    }else{
        breakElement.style.color = "lightgreen";
    }
}


// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}



// Fonction pour démarrer/arrêter le minuteur
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
            startCountdown(); // Démarrer le countdown
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

// Fonction pour réinitialiser le minuteur
function reset() {
  playButton.style.display = "inline"
  resetButton.style.display = "none";
    clearInterval(timer);
    isRunning = false;
    currentTime = workTime;
    updateTimer();
    document.getElementById("form").style.display = "none";
}

// Fonction pour configurer le temps de travail et de pause
function configure() {
  console.log("OK");
    reset();
    const timeInput = document.getElementById("time");
    timeInput.value = currentTime;
    document.getElementById("form").style.display = "block";
}

// Fonction pour mettre à jour la configuration
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

function startCountdown() {
    if (!isRunning) {
        const countdownTime = Math.floor(workTime / 5); // 1/5 du temps de travail
        currentTime = countdownTime; // Mettre à jour le temps actuel avec le countdown
        updateTimer();
        timer = setInterval(function () {
        if (currentTime <= 0) {
            clearInterval(timer);
            isRunning = false;
            work = true; // Revenir au mode travail
            CSS();
            currentTime = workTime;
            updateTimer();
            startTimer(); // Démarrer le minuteur principal
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
