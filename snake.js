import { getDirection } from "./input.js"

const game = document.querySelector('.container');
const scoreDisplay = document.querySelector("#score");
const body = document.body;
const GAME_WIDTH = 700;
const SNAKE_WIDTH = 35;

export let gameover = false;

let thereIsFood = false;
let foodCoordinates;
let score = 0;
let direction;
let snake = [
    { x: 0, y: GAME_WIDTH }
];

export function draw() {
    game.innerHTML = '';
    for (let coordinates of snake) {
        createDivision(coordinates, false);
    }
}

export function update() {
    direction = getDirection();
    for (let i = 0; i < snake.length - 1; i++) {
        snake[i] = {...snake[i + 1] };
    }
    snake[snake.length - 1].x += direction.x;
    snake[snake.length - 1].y += direction.y;
    walkingTroughtWalls();
    createFood();
    checkIfEatenFood();
    updateScore();
    checkBackground();
    if (intersectsWithHimself()) gameover = true;
}

export function youLose() {
    let blackBackground = document.createElement('div');
    blackBackground.setAttribute("id", "black-bg");

    let loseBox = document.createElement('div');
    let loseMsg = document.createTextNode('You Lost!');
    loseBox.appendChild(loseMsg);
    loseBox.setAttribute("id", "lose-msg");

    let restartButton = document.createElement('button');
    let restartButtonMsg = document.createTextNode('Try Again?');
    restartButton.appendChild(restartButtonMsg);
    restartButton.setAttribute('id', "restart-btn");
    restartButton.setAttribute('onclick', 'reload()');

    let loseDiv = document.createElement('div');
    loseDiv.setAttribute("id", "lose-div");
    loseDiv.appendChild(loseBox);
    loseDiv.appendChild(restartButton);

    blackBackground.appendChild(loseDiv);

    body.appendChild(blackBackground);
}

function intersectsWithHimself() {
    for (let i = 0; i < snake.length - 2; i++) {
        if (snake[snake.length - 1].x == snake[i].x && snake[snake.length - 1].y == snake[i].y) {
            return true;
        }
    }
    return false;
}

function walkingTroughtWalls() {
    if (snake[snake.length - 1].x + 1 > GAME_WIDTH) snake[snake.length - 1].x = 0
    else if (snake[snake.length - 1].x + 1 < 0) snake[snake.length - 1].x = GAME_WIDTH - SNAKE_WIDTH;
    else if (snake[snake.length - 1].y + 1 > GAME_WIDTH) snake[snake.length - 1].y = 0
    else if (snake[snake.length - 1].y + 1 < 0) snake[snake.length - 1].y = GAME_WIDTH - SNAKE_WIDTH;
}

function createDivision(coordinates, multicolor) {
    let division = document.createElement('div');
    division.style.transform = `translate(${coordinates.x}px,${coordinates.y}px)`;
    if (multicolor) division.style.backgroundColor = `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)})`;
    game.appendChild(division);
}

function getRandomCoordinates() {
    let randomCoordinates = {
        x: Math.floor(Math.floor(Math.random() * GAME_WIDTH) / SNAKE_WIDTH) * SNAKE_WIDTH,
        y: Math.floor(Math.floor(Math.random() * GAME_WIDTH) / SNAKE_WIDTH) * SNAKE_WIDTH
    };
    console.log(randomCoordinates)
    return randomCoordinates;
}


function createFood() {
    if (!thereIsFood) {
        let randomCoordinates = getRandomCoordinates();
        while (onSnake(randomCoordinates)) {
            randomCoordinates = getRandomCoordinates();
            console.log("onsnake")
        }
        foodCoordinates = randomCoordinates;
        let food = document.createElement('div');
        food.setAttribute('id', 'food');
        food.style.transform = `translate(${foodCoordinates.x}px,${foodCoordinates.y}px)`;
        game.appendChild(food);
        thereIsFood = true;
    } else {
        let food = document.createElement('div');
        food.setAttribute('id', 'food');
        food.style.transform = `translate(${foodCoordinates.x}px,${foodCoordinates.y}px)`;
        game.appendChild(food);
    }
}

function checkIfEatenFood() {
    if (snake[snake.length - 1].x == foodCoordinates.x &&
        snake[snake.length - 1].y == foodCoordinates.y) {
        score++;
        snake.unshift({
            x: foodCoordinates.x + direction.x,
            y: foodCoordinates.y + direction.y
        });
        thereIsFood = false;
        createFood();
    }
}

function onSnake(coordinates) {
    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[i].x === coordinates.x && snake[i].y === coordinates.y) {
            return true;
        }
    }
}

function updateScore() {
    scoreDisplay.innerHTML = score;
}

function checkBackground() {
    if (score < 10) game.style.background = 'black';
    else if (score < 15 && score >= 10) game.style.background = 'url(./foto/1.png)';
    else if (score < 18 && score >= 15) game.style.background = 'url(./foto/2.jpg)';
    else if (score < 20 && score >= 18) game.style.background = 'url(./foto/3.jpg)';
    else if (score < 25 && score >= 20) game.style.background = 'url(./foto/4.jpg)';
    else if (score < 28 && score >= 25) game.style.background = 'url(./foto/5.jpg)';
    else if (score < 30 && score >= 28) game.style.background = 'url(./foto/6.jpg)';
    game.style.backgroundPosition = "center";
    game.style.backgroundSize = "cover";
}