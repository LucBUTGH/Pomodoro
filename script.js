// Variables globales pour le compteur et le minuteur
let timer;
let isRunning = false;
let workTime = 25 * 60; // 25 minutes en secondes
let currentTime = workTime; // Temps actuel (initialisé au temps de travail par défaut)



// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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





updateTimer();
CSS();