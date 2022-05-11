import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', () => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delays = Number(delay.value);
  const interval = Number(step.value);
  const repetitions = Number(amount.value);

  for (let i = 1; i <= repetitions; i++) {
    createPromise(i, delays)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
    delays += interval;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
