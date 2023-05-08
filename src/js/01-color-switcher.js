const startBtn = document.querySelectorAll('button')[0];
const stopBtn = document.querySelectorAll('button')[1];
let intervalChange;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorStart() {
  intervalChange = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function changeColorStop() {
  clearInterval(intervalChange);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
startBtn.addEventListener('click', changeColorStart);
stopBtn.addEventListener('click', changeColorStop);
