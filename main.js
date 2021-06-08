// main function
import { draw as snakeDraw, update as snakeUpdate, gameover, youLose } from "./snake.js"
const SNAKE_SPEED = 5;
let renderTime = 0;

function main(currentTime) {
    // frame management
    const secondsSinceLastRender = (currentTime - renderTime) / 1000;
    window.requestAnimationFrame(main);
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    if (!gameover) {
        snakeDraw();
        snakeUpdate();
    } else {
        youLose();
    }

    renderTime = currentTime;
}

window.requestAnimationFrame(main);