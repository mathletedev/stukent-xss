import { donate } from "./donate";

const canvas = document.getElementById("neo-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const GRID_WEIGHT = 2;
const INITIAL_LENGTH = 4;
const TARGET = 40;

class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static ZERO = new Vec2(0, 0);
}

interface Snake {
    head: Vec2;
    vel: Vec2;
    cells: Vec2[];
    length: number;
}

let snake: Snake;
let apple: Vec2;
let running = false;
let frame = 0;
let buffer = false;

const randomiseApple = () => {
    apple = new Vec2(
        Math.floor(Math.random() * COLS),
        Math.floor(Math.random() * ROWS),
    );
};

const init = () => {
    snake = {
        head: new Vec2(COLS / 2, ROWS / 2),
        vel: new Vec2(1, 0),
        cells: [],
        length: INITIAL_LENGTH,
    };
    randomiseApple();
};

const play = () => {
    init();
    running = true;
};

const gameOver = () => {
    running = false;

    if (snake.length - INITIAL_LENGTH < TARGET) {
        donate();
        return;
    }

    alert("Thanks for playing!");
};

const gameLoop = () => {
    requestAnimationFrame(gameLoop);

    if (++frame < 4) {
        return;
    }

    frame = 0;

    ctx.fillStyle = "#1e1e2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (running) {
        snake.head.x += snake.vel.x;
        snake.head.y += snake.vel.y;

        buffer = false;

        if (snake.head.x < 0) {
            snake.head.x = COLS - 1;
        } else if (snake.head.x >= COLS) {
            snake.head.x = 0;
        }
        if (snake.head.y < 0) {
            snake.head.y = ROWS - 1;
        } else if (snake.head.y >= ROWS) {
            snake.head.y = 0;
        }
    }

    snake.cells.unshift(new Vec2(snake.head.x, snake.head.y));
    if (snake.cells.length > snake.length) {
        snake.cells.pop();
    }

    ctx.fillStyle = "#a6e3a1";
    for (let i = 0; i < snake.cells.length; i++) {
        const cell = snake.cells[i];
        ctx.fillRect(
            cell.x * CELL_SIZE + GRID_WEIGHT / 2,
            cell.y * CELL_SIZE + GRID_WEIGHT / 2,
            CELL_SIZE - GRID_WEIGHT,
            CELL_SIZE - GRID_WEIGHT,
        );

        if (!running) {
            break;
        }

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.length++;
            randomiseApple();
        }

        for (let j = i + 1; j < snake.cells.length; j++) {
            const other = snake.cells[j];

            if (cell.x === other.x && cell.y === other.y) {
                gameOver();
                return;
            }
        }
    }

    ctx.fillStyle = "#f38ba8";
    ctx.fillRect(
        apple.x * CELL_SIZE + GRID_WEIGHT / 2,
        apple.y * CELL_SIZE + GRID_WEIGHT / 2,
        CELL_SIZE - GRID_WEIGHT,
        CELL_SIZE - GRID_WEIGHT,
    );

    ctx.fillStyle = "#b4befe";
    ctx.font = "16px Roboto";
    ctx.fillText(`Score: ${snake.length - 4}`, 10, 24);
};

document.onkeydown = (e) => {
    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            if (snake.vel.y === 0 && !buffer) {
                snake.vel.y = -1;
                snake.vel.x = 0;
                buffer = true;
            }
            break;

        case "KeyA":
        case "ArrowLeft":
            if (snake.vel.x === 0 && !buffer) {
                snake.vel.x = -1;
                snake.vel.y = 0;
                buffer = true;
            }
            break;

        case "KeyS":
        case "ArrowDown":
            if (snake.vel.y === 0 && !buffer) {
                snake.vel.y = 1;
                snake.vel.x = 0;
                buffer = true;
            }
            break;

        case "KeyD":
        case "ArrowRight":
            if (snake.vel.x === 0 && !buffer) {
                snake.vel.x = 1;
                snake.vel.y = 0;
                buffer = true;
            }
            break;
    }
};

init();
document.getElementById("neo-button")!.onclick = play;

requestAnimationFrame(gameLoop);
