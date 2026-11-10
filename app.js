
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;
let playingSequence = false;

let h2 = document.querySelector("h2");
let levelDisplay = document.querySelector("#level");
let highScoreDisplay = document.querySelector("#high-score");
let startBtn = document.querySelector("#start-btn");

highScoreDisplay.innerText = highScore;


// Start Game

startBtn.addEventListener("click", function () {

    if (!started) {
        startGame();
    }

});


// Start Game Function

function startGame() {

    started = true;

    level = 0;

    gameSeq = [];
    userSeq = [];

    startBtn.disabled = true;

    startBtn.innerText = "Game Running";

    h2.innerText = "Watch the sequence carefully!";

    levelUp();

}


// Game Flash

function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {

        btn.classList.remove("flash");

    }, 250);

}


// User Flash

function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {

        btn.classList.remove("userflash");

    }, 250);

}


// Level Up

function levelUp() {

    userSeq = [];

    level++;

    levelDisplay.innerText = level;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    playSequence();

}


// Play Complete Sequence

function playSequence() {

    playingSequence = true;

    let i = 0;

    function flashNext() {

        if (i >= gameSeq.length) {

            playingSequence = false;

            return;

        }

        let color = gameSeq[i];

        let btn = document.querySelector(`.${color}`);

        gameFlash(btn);

        i++;

        setTimeout(flashNext, 600);

    }

    flashNext();

}


// Button Press

function btnPress() {

    if (!started || playingSequence) {
        return;
    }

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    console.log("User Sequence:", userSeq);

    checkColor(userSeq.length - 1);

}


// Check Color

function checkColor(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {

            playingSequence = true;

            h2.innerText = "Correct! Next Level";

            setTimeout(function () {

                levelUp();

            }, 1000);

        }

    } else {

        gameOver();

    }

}


// Game Over

function gameOver() {

    started = false;

    playingSequence = false;

    h2.innerHTML = `Game Over! Your score was <b>${level}</b>`;

    startBtn.disabled = false;

    startBtn.innerText = "Restart Game";

    document.body.classList.add("game-over");

    setTimeout(function () {

        document.body.classList.remove("game-over");

    }, 200);


    // Update High Score

    if (level > highScore) {

        highScore = level;

        localStorage.setItem("highScore", highScore);

        highScoreDisplay.innerText = highScore;

    }

    reset();

}


// Reset Game

function reset() {

    started = false;

    playingSequence = false;

    gameSeq = [];

    userSeq = [];

    level = 0;

    levelDisplay.innerText = level;

}


// Add Click Events

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {

    btn.addEventListener("click", btnPress);

}
