import { draw as snakeDraw, update as snakeUpdate, gameover, youLose } from "./snake.js"
const SNAKE_SPEED = 5;
let renderTime = 0;



function main(currentTime) {
    const secondsSienceLastRender = (currentTime - renderTime) / 1000;
    window.requestAnimationFrame(main);
    if (secondsSienceLastRender < 1 / SNAKE_SPEED) return;

    if (!gameover) {
        snakeDraw();
        snakeUpdate();
    } else {
        youLose();
    }


    renderTime = currentTime;
}
window.requestAnimationFrame(main);