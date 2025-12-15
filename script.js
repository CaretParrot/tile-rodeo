let days;
let hours;
let minutes;
let seconds;
let timerRunning = false;
let whitesTurn = false;
/** 
 * @type {number} 
 * */
let  timer;

let daysTime = /** @type {HTMLInputElement} */ (document.getElementById("daysTime"));
let hoursTime = /** @type {HTMLInputElement} */ (document.getElementById("hoursTime"));
let minutesTime = /** @type {HTMLInputElement} */ (document.getElementById("minutesTime"));
let secondsTime = /** @type {HTMLInputElement} */ (document.getElementById("secondTime"));

let daysIncrement = /** @type {HTMLInputElement} */ (document.getElementById("daysIncrement"));
let hoursIncrement = /** @type {HTMLInputElement} */ (document.getElementById("hoursIncrement"));
let minutesIncrement = /** @type {HTMLInputElement} */ (document.getElementById("minutesIncrement"));
let secondsIncrement = /** @type {HTMLInputElement} */ (document.getElementById("secondIncrement"));

let whiteTime = /** @type {HTMLButtonElement} */ (document.getElementById("whiteTime"));
let blackTime = /** @type {HTMLButtonElement} */ (document.getElementById("blackTime"));

let startButton = /** @type {HTMLButtonElement} */ (document.getElementById("startButton"));
let backButton = /** @type {HTMLButtonElement} */ (document.getElementById("backButton"));

resetClocks();

let timerData = {
    increment: 0,
    white: {
        totalTime: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    black: {
        totalTime: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }
}

/**
 * 
 * @param {string} pageId 
 */
function switchPage(pageId) {
    let allPages = /** @type {HTMLCollectionOf<HTMLDivElement>} */ (document.getElementsByClassName("page"));

    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    /** @type {HTMLDivElement} */ (document.getElementById(pageId)).style.display = "grid";

    timerRunning = false;
    whitesTurn = false;

    startButton.innerHTML = "Start";
    backButton.style.display = "flex";

    resetClocks();
}

function resetClocks() {
    setClocks(+daysTime.value, +hoursTime.value, +minutesTime.value, +secondsTime.value, +daysTime.value, +hoursTime.value, +minutesTime.value, +secondsTime.value);
}

function toggleClock() {
    whiteTime.style.backgroundColor = "light-dark(var(--light-3), var(--dark-3)";
    if (timerRunning === false && whitesTurn === null) {
        timerRunning = true;
        whitesTurn = true;
        timerData.white.totalTime = (+daysTime.value * 86400) + (+hoursTime.value * 3600) + (+minutesTime.value * 60) + +secondsTime.value;
        timerData.black.totalTime = (+daysTime.value * 86400) + (+hoursTime.value * 3600) + (+minutesTime.value * 60) + +secondsTime.value;
        timerData.increment = (+daysIncrement.value * 86400) + (+hoursIncrement.value * 3600) + (+minutesIncrement.value * 60) + +secondsIncrement.value;

        startButton.innerHTML = "↺";
        backButton.style.display = "none";

        timer = setInterval(function () {
            if (whitesTurn === true) {
                timerData.white.totalTime--;
            } else {
                timerData.black.totalTime--;
            }
            updateClocks();

            if (timerData.white.totalTime === 0) {
                whiteTime.innerHTML = "Black wins!";
                blackTime.innerHTML = "Black wins!";
                whiteTime.style.fontSize = "600%";
                blackTime.style.fontSize = "600%";
                backButton.style.display = "flex";

                clearInterval(timer);
                timerRunning = false;
                whitesTurn = false;
            }

            if (timerData.black.totalTime === 0) {
                blackTime.innerHTML = "White wins!";
                whiteTime.innerHTML = "White wins!";
                blackTime.style.fontSize = "600%";
                whiteTime.style.fontSize = "600%";
                blackTime.style.display = "flex"; 

                clearInterval(timer);
                timerRunning = false;
                whitesTurn = false;
            }
        }, 1000);

    } else if (whitesTurn === false && timerRunning === false) {
        startButton.innerHTML = "Start";

        resetClocks();
        whitesTurn = false;
    } else {
        timerRunning = false;
        whitesTurn = false;

        blackTime.style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";
        whiteTime.style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";

        startButton.innerHTML = "Start";
        backButton.style.display = "flex";

        resetClocks();
        clearInterval(timer);
    }
}

function togglePlayer() {
    if (whitesTurn === true && timerRunning === true) {
        whitesTurn = false;
        timerData.white.totalTime += timerData.increment;
        updateClocks();
        blackTime.style.backgroundColor = "light-dark(var(--light-3), var(--dark-3)";
        whiteTime.style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";
    } else if (timerRunning === true) {
        whitesTurn = true;
        timerData.black.totalTime += timerData.increment;
        updateClocks();
        whiteTime.style.backgroundColor = "light-dark(var(--light-3), var(--dark-3)";
        blackTime.style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";
    }
}

function updateClocks() {
    timerData.white.days = Math.floor(timerData.white.totalTime / 86400);
    timerData.white.hours = Math.floor((timerData.white.totalTime % 86400) / 3600);
    timerData.white.minutes = Math.floor(((timerData.white.totalTime % 86400) % 3600) / 60);
    timerData.white.seconds = Math.floor(((timerData.white.totalTime % 86400) % 3600) % 60);
    timerData.black.days = Math.floor(timerData.black.totalTime / 86400);
    timerData.black.hours = Math.floor((timerData.black.totalTime % 86400) / 3600);
    timerData.black.minutes = Math.floor(((timerData.black.totalTime % 86400) % 3600) / 60);
    timerData.black.seconds = Math.floor(((timerData.black.totalTime % 86400) % 3600) % 60);
    setClocks(timerData.white.days, timerData.white.hours, timerData.white.minutes, timerData.white.seconds, timerData.black.days, timerData.black.hours, timerData.black.minutes, timerData.black.seconds);
}

/**
 * 
 * @param {string | number} whiteDays 
 * @param {string | number} whiteHours 
 * @param {string | number} whiteMinutes 
 * @param {string | number} whiteSeconds 
 * @param {string | number} blackDays 
 * @param {string | number} blackHours 
 * @param {string | number} blackMinutes 
 * @param {string | number} blackSeconds 
 */
function setClocks(whiteDays, whiteHours, whiteMinutes, whiteSeconds, blackDays, blackHours, blackMinutes, blackSeconds) {
    let newWhiteDays = /** @type {string} */ (whiteDays);
    let newWhiteHours = /** @type {string} */ (whiteHours);
    let newWhiteMinutes = /** @type {string} */ (whiteMinutes);
    let newWhiteSeconds = /** @type {string} */ (whiteSeconds);
    let newBlackDays = /** @type {string} */ (blackDays);
    let newBlackHours = /** @type {string} */ (blackHours);
    let newBlackMinutes = /** @type {string} */ (blackMinutes);
    let newBlackSeconds = /** @type {string} */ (blackSeconds);

    if (+blackDays === 0) {
        newBlackDays = "";
    } else if (blackDays.toString().length === 1) {
        newBlackDays = `0${blackDays}:`;
    } else {
        newBlackDays = `${blackDays}:`;
    }

    if (+blackHours === 0 && +blackDays === 0) {
        newBlackHours = "";
    } else if (blackHours.toString().length === 1) {
        newBlackHours = `0${blackHours}:`;
    } else {
        newBlackHours = `${blackHours}:`;
    }

    if (blackMinutes.toString().length === 1) {
        newBlackMinutes = `0${blackMinutes}:`;
    } else {
        newBlackMinutes = `${blackMinutes}:`;
    }

    if (blackSeconds.toString().length === 1) {
        newBlackSeconds = `0${blackSeconds}`;
    } else {
        newBlackSeconds = `${blackSeconds}`;
    }

    if (+whiteDays === 0) {
        newWhiteDays = "";
    } else if (whiteDays.toString().length === 1) {
        newWhiteDays = `0${whiteDays}:`;
    } else {
        newWhiteDays = `${whiteDays}:`;
    }

    if (+whiteHours === 0 && +whiteDays === 0) {
        newWhiteHours = "";
    } else if (whiteHours.toString().length === 1) {
        newWhiteHours = `0${whiteHours}:`;
    } else {
        newWhiteHours = `${whiteHours}:`;
    }

    if (whiteMinutes.toString().length === 1) {
        newWhiteMinutes = `0${whiteMinutes}:`;
    } else {
        newWhiteMinutes = `${whiteMinutes}:`;
    }

    if (whiteSeconds.toString().length === 1) {
        newWhiteSeconds = `0${whiteSeconds}`;
    } else {
        newWhiteSeconds = `${whiteSeconds}`;
    }

    blackTime.innerHTML = `${newBlackDays}${newBlackHours}${newBlackMinutes}${newBlackSeconds}`;
    whiteTime.innerHTML = `${newWhiteDays}${newWhiteHours}${newWhiteMinutes}${newWhiteSeconds}`;
}

oninput = function (event) {
    resetClocks();
}