const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let foodX, foodY;
let snakeX = 15,
    snakeY = 7;
let velocityX = 0,
    velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;
// Getting high score form the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score : ${highScore}`;

// Random food position
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    //Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over, press OK to restart ...");
    location.reload();
};

// Change direction the snake head
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        (velocityX = 0), (velocityY = -1);
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        (velocityX = 0), (velocityY = 1);
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        (velocityX = -1), (velocityY = 0);
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        (velocityX = 1), (velocityY = 0);
    }
};

const initGame = () => {
    if (gameOver) return handleGameOver();
    // Firs position of snake and food
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food
    if (snakeX == foodX && snakeY == foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); //Pushing food position to snakeBody array
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score : ${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        //Shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; //Setting firs element of snake body to current snake position

    //Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    //Checking if the snake hit the wall, gameOver is true
    if (snakeX > 30 || snakeX < 0 || snakeY > 30 || snakeY < 0) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //Chechking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 100); //Automatic snake moving

document.addEventListener("keydown", changeDirection);
