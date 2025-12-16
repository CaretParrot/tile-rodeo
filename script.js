let timerRunning = false;
let whitesTurn = false;
/** 
 * @type {number} 
 * */
let  timer;

let hoursTime = /** @type {HTMLInputElement} */ (document.getElementById("hoursTime"));
let minutesTime = /** @type {HTMLInputElement} */ (document.getElementById("minutesTime"));
let secondsTime = /** @type {HTMLInputElement} */ (document.getElementById("secondsTime"));

let hoursIncrement = /** @type {HTMLInputElement} */ (document.getElementById("hoursIncrement"));
let minutesIncrement = /** @type {HTMLInputElement} */ (document.getElementById("minutesIncrement"));
let secondsIncrement = /** @type {HTMLInputElement} */ (document.getElementById("secondsIncrement"));

let whiteTime = /** @type {HTMLButtonElement} */ (document.getElementById("whiteTime"));
let blackTime = /** @type {HTMLButtonElement} */ (document.getElementById("blackTime"));

let startButton = /** @type {HTMLButtonElement} */ (document.getElementById("startButton"));
let backButton = /** @type {HTMLButtonElement} */ (document.getElementById("backButton"));


/**
 * @type {Date}
 */
let whiteClock = new Date(Date.UTC(0));
/**
 * @type {Date}
 */
let blackClock = new Date(Date.UTC(0));
/** 
 * @type {Date}
 */
let increment;

let allPages = /** @type {HTMLCollectionOf<HTMLDivElement>} */ (document.getElementsByClassName("page"));

resetClocks();

/**
 * 
 * @param {string} pageId 
 */
function switchPage(pageId) {
    startButton.innerHTML = "Start";
    backButton.style.display = "flex";

    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    /** @type {HTMLDivElement} */ (document.getElementById(pageId)).style.display = "grid";

    timerRunning = false;
    whitesTurn = false;

    resetClocks();
}

function resetClocks() {
    timerRunning = false;
    whitesTurn = false;
    whiteClock = new Date(Date.UTC(0, 0, 0, +hoursTime.value, +minutesTime.value, +secondsTime.value));
    blackClock = new Date(Date.UTC(0, 0, 0, +hoursTime.value, +minutesTime.value, +secondsTime.value));
    updateClocks();
}

function toggleClock() {
    if (timerRunning === false) {
        timerRunning = true;
        whitesTurn = true;
        whiteClock = new Date(Date.UTC(0, 0, 0, +hoursTime.value, +minutesTime.value, +secondsTime.value));
        blackClock = new Date(Date.UTC(0, 0, 0, +hoursTime.value, +minutesTime.value, +secondsTime.value));
        increment = new Date(Date.UTC(0, 0, 0, +hoursIncrement.value, +minutesIncrement.value, +secondsIncrement.value));

        whiteTime.disabled = false;
        blackTime.disabled = false;
        backButton.disabled = true;

        updateClocks();

        startButton.innerHTML = "↺";

        timer = setInterval(function () {
            if (whitesTurn === true) {
                whiteClock.setSeconds(whiteClock.getSeconds() - 1);
            } else {
                blackClock.setSeconds(blackClock.getSeconds() - 1);
            }
            
            updateClocks();

            if (whiteClock === new Date(Date.UTC(0))) {
                whiteTime.innerHTML = "Loss";
                blackTime.innerHTML = "Win";

                clearInterval(timer);
                timerRunning = false;
                whitesTurn = false;

                whiteTime.disabled = true;
                blackTime.disabled = true;
                backButton.disabled = false;
            }

            if (blackClock === new Date(Date.UTC(0))) {
                blackTime.innerHTML = "Loss";
                whiteTime.innerHTML = "Win";

                clearInterval(timer);
                timerRunning = false;
                whitesTurn = false;

                whiteTime.disabled = true;
                blackTime.disabled = true;
                backButton.disabled = false;
            }
        }, 1000);
    } else {
        timerRunning = false;
        whitesTurn = false;

        whiteTime.disabled = true;
        blackTime.disabled = true;
        backButton.disabled = false;

        startButton.innerHTML = "Start";

        resetClocks();
        clearInterval(timer);
    }
}

function togglePlayer() {
    if (whitesTurn === true && timerRunning === true) {
        whitesTurn = false;

        whiteTime.style.backgroundColor = "var(--element)";
        blackTime.style.backgroundColor = "var(--accent)";

        whiteClock.setHours(whiteClock.getHours() + increment.getUTCHours());
        whiteClock.setMinutes(whiteClock.getMinutes() + increment.getUTCMinutes());
        whiteClock.setSeconds(whiteClock.getSeconds() + increment.getUTCSeconds());
        updateClocks();
    } else if (timerRunning === true) {
        whitesTurn = true;

        blackTime.style.backgroundColor = "var(--element)";
        whiteTime.style.backgroundColor = "var(--accent)";

        blackClock.setHours(blackClock.getHours() + increment.getUTCHours());
        blackClock.setMinutes(blackClock.getMinutes() + increment.getUTCMinutes());
        blackClock.setSeconds(blackClock.getSeconds() + increment.getUTCSeconds());
        updateClocks();
    }
}

function updateClocks() {
    setClocks(whiteClock, blackClock);
}

/**
 * 
 * @param {Date} whiteClock 
 * @param {Date} blackClock 
 */
function setClocks(whiteClock, blackClock) {
    whiteTime.innerHTML = whiteClock.toUTCString().substring(16, 25);
    blackTime.innerHTML = blackClock.toUTCString().substring(16, 25);
}