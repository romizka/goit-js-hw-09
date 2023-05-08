// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let countDown;

let pickedDate = 0;
let millisecondsLeft = 0;
let timeLeft = 0;
let timerId = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0].getTime();

    if (pickedDate < Date.parse(options.defaultDate)) {
      alert('Please choose a date in the future');
      startButton.setAttribute('disabled', '');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  if (value < 10) return value.toString().padStart(2, '0');
  return value;
};

const endCountdown = () => {
  clearInterval(timerId);
  daysField.textContent = '00';
  hoursField.textContent = '00';
  minutesField.textContent = '00';
  secondsField.textContent = '00';
};

const startCountdown = () => {
  timerId = setInterval(() => {
    millisecondsLeft = pickedDate - new Date().getTime();
    timeLeft = convertMs(millisecondsLeft);

    daysField.textContent = addLeadingZero(timeLeft.days);
    hoursField.textContent = addLeadingZero(timeLeft.hours);
    minutesField.textContent = addLeadingZero(timeLeft.minutes);
    secondsField.textContent = addLeadingZero(timeLeft.seconds);

    startButton.setAttribute('disabled', '');

    if (millisecondsLeft < 0) {
      endCountdown();
      startButton.disabled = false;
    }
  }, 1000);
};

startButton.addEventListener('click', startCountdown);
