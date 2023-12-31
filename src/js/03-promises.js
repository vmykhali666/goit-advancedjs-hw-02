import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    iziToast.show({
      title: 'Warning',
      message: `❗ Please enter a positive number`,
      position: 'topCenter',
      color: 'yellow',
    });
    return;
  }

  for (let position = 0; position < amount.value; position++) {
    const delays = Number(delay.value) + step.value * position;

    createPromise(position, delays)
      .then(({ position, delay }) => {
        iziToast.show({
          title: 'Success',
          message: `✅ Fulfilled promise ${position + 1} in ${delay}ms`,
          position: 'topCenter',
          color: 'green',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          title: 'Error',
          message: `❌ Rejected promise ${position + 1} in ${delay}ms`,
          position: 'topCenter',
          color: 'red',
        });
      });
  }

  event.currentTarget.reset();
}