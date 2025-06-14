const timerDisplay = document.getElementById('timer');
const teaSelect = document.getElementById('tea');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const alarm = document.getElementById('alarm-sound');

let remainingTime = parseInt(teaSelect.value);
let intervalId = null;
let isRunning = false;

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  intervalId = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(intervalId);
      isRunning = false;
      alarm.play(); // 🔔 play sound
    }
  }, 1000);
  animateSteam(true);
}

function pauseTimer() {
  clearInterval(intervalId);
  isRunning = false;
  animateSteam(false);
}

function resetTimer() {
  clearInterval(intervalId);
  isRunning = false;
  remainingTime = parseInt(teaSelect.value);
  updateDisplay();
  animateSteam(false);
}

teaSelect.addEventListener('change', () => {
  resetTimer();
  changeTheme(teaSelect.value);
});

function changeTheme(value) {
  const container = document.querySelector('.container');
  if (value === '180') {
    container.style.background = 'rgba(239, 248, 238, 0.9)';
  } else if (value === '240') {
    container.style.background = 'rgba(255, 245, 230, 0.9)';
  } else if (value === '300') {
    container.style.background = 'rgba(245, 238, 255, 0.9)';
  }
}

function animateSteam(start) {
  const steamLines = document.querySelectorAll('.steam-line');
  if (start) {
    steamLines.forEach((line, i) => {
      gsap.to(line, {
        y: -60,
        opacity: 0,
        repeat: -1,
        duration: 2,
        delay: i * 0.4,
        ease: "power1.out",
        onRepeat: () => {
          gsap.set(line, { y: 0, opacity: 1 });
        }
      });
    });
  } else {
    gsap.killTweensOf('.steam-line');
    steamLines.forEach(line => {
      gsap.set(line, { y: 0, opacity: 1 });
    });
  }
}

updateDisplay();
changeTheme(teaSelect.value);

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);



