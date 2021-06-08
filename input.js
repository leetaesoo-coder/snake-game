// snake movement direction management
const SNAKE_WIDTH = 35;
let direction = { x: SNAKE_WIDTH, y: 0 };
let dir = { x: 0, y: 0 };


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowRight":
            if (dir.y == 0) break;
            direction = { x: SNAKE_WIDTH, y: 0 };
            break;
        case "ArrowLeft":
            if (dir.y == 0) break;
            direction = { x: -SNAKE_WIDTH, y: 0 };
            break;
        case "ArrowDown":
            if (dir.x == 0) break;
            direction = { x: 0, y: SNAKE_WIDTH };
            break;
        case "ArrowUp":
            if (dir.x == 0) break;
            direction = { x: 0, y: -SNAKE_WIDTH };
            break;
    }
});

export function getDirection() {
    dir = direction;
    return direction;
}