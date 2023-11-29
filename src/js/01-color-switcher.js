const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
let intervalID = undefined;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startButton.addEventListener('click', (event) => {
    intervalID = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.setAttribute("disabled", true);
});

stopButton.addEventListener('click', event => {
    if (intervalID !== undefined) {
        clearInterval(intervalID);
        startButton.removeAttribute("disabled", false);
    } 
})