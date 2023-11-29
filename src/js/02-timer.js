import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

const inputFlatPickr = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const outputDays = document.querySelector("[data-days]");
const outputHours = document.querySelector("[data-hours]");
const outputMinutes = document.querySelector("[data-minutes]");
const outputSeconds = document.querySelector("[data-seconds]");

let dateTime = new Date();
let isTimerActive = false;
startButton.setAttribute("disabled", false);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > new Date()) {
            startButton.removeAttribute("disabled");
            console.log(selectedDates[0]);
            dateTime = selectedDates[0];
        }
        else {
            iziToast.show({
                title: "Error",
                position: "topCenter",
                color: "red",
                message: "Please choose a date in the future"
            });
            startButton.setAttribute("disabled", false);
        }
    },
};

function convertMs(ms) {
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
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

startButton.addEventListener("click", event => {
    
    if (!isTimerActive) {
        console.log(new Date());
        startButton.setAttribute("disabled", true);
        isTimerActive = true;
        let intervalIndex = setInterval(() => {
            let timeLeft = dateTime.getTime() - Date.now();
            const { days , hours, minutes, seconds } = convertMs(timeLeft);

            outputDays.innerHTML = addLeadingZero(days);
            outputHours.innerHTML = addLeadingZero(hours);
            outputMinutes.innerHTML = addLeadingZero(minutes);
            outputSeconds.innerHTML = addLeadingZero(seconds);

            if ((days + hours + minutes + seconds) <= 0) {
                clearInterval(intervalIndex);
                isTimerActive = false;
                startButton.removeAttribute("disabled");
            }
        }, 1000);
    }
})

const picker = flatpickr(inputFlatPickr, options);