import { CanvasView } from "./view/CanvasView";
import { Brick } from "./sprites/Brick";
import { Ball } from "./sprites/Ball";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";

// @ts-ignore
import PADDLE_IMAGE from "./images/paddle.png";
// @ts-ignore
import BALL_IMAGE from "./images/ball.png";

import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";
import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;

const setGameOver = (view: CanvasView) => {
  view.drawInfo("Game Over!");
  gameOver = false;
};

const setGameWin = (View: CanvasView) => {
  View.drawInfo("You Won!");
  gameOver = false;
};

const gameLoop = (
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) => {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  ball.moveBall();

  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  collision.checkBarrierCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score += 1;
    view.drawScore(score);
  }

  if (ball.pos.y > view.canvas.height) {
    gameOver = true;
    return setGameOver(view);
  }
  if (bricks.length === 0) {
    return setGameWin(view);
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
};

const startGame = (view: CanvasView) => {
  score = 0;
  view.drawScore(0);
  view.drawInfo("");

  const collision = new Collision();

  const bricks = createBricks();
  const ball = new Ball(
    BALL_SIZE,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_SPEED,
    BALL_IMAGE
  );
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 },
    PADDLE_IMAGE
  );

  gameLoop(view, bricks, paddle, ball, collision);
};

// const view = new CanvasView("#playField");
// view.initStartButton(startGame);

export { CanvasView, startGame };
