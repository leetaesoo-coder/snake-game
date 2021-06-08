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

// draws the snake
export function draw() {
    game.innerHTML = '';
    for (let coordinates of snake) {
        createDivision(coordinates, false);
    }
}

// uppdates the entire game
export function update() {

    // update the position
    direction = getDirection();
    updatePosition(direction);

    walkingThroughWalls();
    createFood();
    checkIfEatenFood();
    updateScore();
    checkBackground();

    // if he hits himself the game is over
    if (intersectsWithHimself()) gameover = true;
}

// game behavior in case that you lose, it's a blackscreen with 
// a big message saying "you lost" and asks if you want to play again
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

// updates the coordinates/position of each of the divisions of the snake
function updatePosition(direction) {
    for (let i = 0; i < snake.length - 1; i++) {
        snake[i] = {...snake[i + 1] };
    }

    snake[snake.length - 1].x += direction.x;
    snake[snake.length - 1].y += direction.y;
}

// return a boolean that tells if he is intersecting with one of his parts
function intersectsWithHimself() {
    for (let i = 0; i < snake.length - 2; i++)
        if (snake[snake.length - 1].x == snake[i].x && snake[snake.length - 1].y == snake[i].y)
            return true;

    return false;
}

// gives the posiblity to walk through walls
function walkingThroughWalls() {

    // check right side
    if (snake[snake.length - 1].x + 1 > GAME_WIDTH) snake[snake.length - 1].x = 0

    // check left side
    else if (snake[snake.length - 1].x + 1 < 0) snake[snake.length - 1].x = GAME_WIDTH - SNAKE_WIDTH;

    // check down side
    else if (snake[snake.length - 1].y + 1 > GAME_WIDTH) snake[snake.length - 1].y = 0

    // check up side
    else if (snake[snake.length - 1].y + 1 < 0) snake[snake.length - 1].y = GAME_WIDTH - SNAKE_WIDTH;
}

// creates a division and appends it to the snake
// if multicolor == true then the colors of the division change at each frame 
function createDivision(coordinates, multicolor) {
    let division = document.createElement('div');
    division.style.transform = `translate(${coordinates.x}px,${coordinates.y}px)`;
    if (multicolor) division.style.backgroundColor = `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)})`;
    game.appendChild(division);
}

// generate random coordinates on the screen
function getRandomCoordinates() {
    return {
        x: Math.floor(Math.floor(Math.random() * GAME_WIDTH) / SNAKE_WIDTH) * SNAKE_WIDTH,
        y: Math.floor(Math.floor(Math.random() * GAME_WIDTH) / SNAKE_WIDTH) * SNAKE_WIDTH
    };
}

// creates food
function createFood() {

    if (!thereIsFood) {
        let randomCoordinates = getRandomCoordinates();

        // doesn't allow the food to appear on the snake
        while (onSnake(randomCoordinates)) {
            randomCoordinates = getRandomCoordinates();
        }
        foodCoordinates = randomCoordinates;

        // creates the actual element
        let food = document.createElement('div');
        food.setAttribute('id', 'food');
        food.style.transform = `translate(${foodCoordinates.x}px,${foodCoordinates.y}px)`;
        game.appendChild(food);

        thereIsFood = true;

    } else {

        // if there is already food on the screen then just update it
        let food = document.createElement('div');
        food.setAttribute('id', 'food');
        food.style.transform = `translate(${foodCoordinates.x}px,${foodCoordinates.y}px)`;
        game.appendChild(food);

    }
}

function checkIfEatenFood() {
    // if he interesects the food
    if (snake[snake.length - 1].x == foodCoordinates.x &&
        snake[snake.length - 1].y == foodCoordinates.y) {

        // the score grows
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
    for (let i = 0; i < snake.length - 1; i++)
        if (snake[i].x === coordinates.x && snake[i].y === coordinates.y)
            return true;
    return false;
}

function updateScore() {
    scoreDisplay.innerHTML = score;
}

// changes the background optionally
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