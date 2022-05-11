const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalEvent = null;

startButton.addEventListener('click', startBackgrounв);
stopButton.addEventListener('click', stopBackgrounв);

function startBackgrounв() {
  startButton.setAttribute('disabled', true);
  intervalEvent = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function stopBackgrounв() {
  startButton.removeAttribute('disabled');
  clearInterval(intervalEvent);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
