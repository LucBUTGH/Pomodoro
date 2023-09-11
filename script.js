// Variables globales pour le compteur et le minuteur
let timer;
let isRunning = false;
let work = true;
let workTime = 25 * 60; // 25 minutes en secondes
let breakTime = 5 * 60; // 5 minutes en secondes
let currentTime = workTime; // Temps actuel (initialisé au temps de travail par défaut)
let workElement = document.getElementById("work")
let breakElement = document.getElementById("break")


// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

//Réinitialiser minuteur
function reset() {
  clearInterval(timer);
  isRunning = false;
  currentTime = workTime;
  updateTimer();
  document.getElementById("form").style.display = "none";
}


// Fonction pour démarrer/arrêter le minuteur
function startTimer() {
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





updateTimer();
CSS();