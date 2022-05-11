import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputData = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const d = document.querySelector('[data-days]');
const h = document.querySelector('[data-hours]');
const m = document.querySelector('[data-minutes]');
const s = document.querySelector('[data-seconds]');
let valueTime = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    valueTime = new Date(selectedDates.join('')).getTime();

    isValid(valueTime);
  },
};

startBtn.setAttribute('disabled', true);

flatpickr(inputData, options);

startBtn.addEventListener('click', () => {
  setInterval(() => {
    const time = realTime();
    const set = valueTime - time;
    const { days, hours, minutes, seconds } = convertMs(set);
    d.textContent = `${days}`;
    h.textContent = `${hours}`;
    m.textContent = `${minutes}`;
    s.textContent = `${seconds}`;
    // ocloce(days, hours, minutes, seconds);
  }, 1000);
});

// function ocloce(days, hours, minutes, seconds) {
//   console.log('🚀 ~ seconds', seconds);
//   console.log('🚀 ~ minutes', minutes);
//   console.log('🚀 ~ hours', hours);
//   console.log('🚀 ~ days', days);

// }

function realTime() {
  return new Date().getTime();
}

function isValid(a) {
  const time = realTime();
  if (a < time) {
    alert('Please choose a date in the future');
  }
  startBtn.removeAttribute('disabled');
}

function addLeadingZero(daysp, hoursp, minutesp, secondsp) {
  const days = String(daysp).padStart(2, 0);
  const hours = String(hoursp).padStart(2, 0);
  const minutes = String(minutesp).padStart(2, 0);
  const seconds = String(secondsp).padStart(2, 0);
  return { days, hours, minutes, seconds };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const daysp = Math.floor(ms / day);
  // Remaining hours
  const hoursp = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutesp = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const secondsp = Math.floor((((ms % day) % hour) % minute) / second);

  return addLeadingZero(daysp, hoursp, minutesp, secondsp);
}
