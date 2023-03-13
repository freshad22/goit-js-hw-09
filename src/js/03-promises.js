import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let delayInput = parseInt(delay.value);
  let stepInput = parseInt(step.value);
  let amountInput = parseInt(amount.value);
  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayInput += stepInput;
  }
  event.currentTarget.reset();
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
