const init = () => {
  console.log(game);
  game = {
    ...game,
    canvas: document.getElementById("myCanvas"),
    ctx: document.getElementById("myCanvas").getContext("2d"),
    width: window.innerWidth,
    height: window.innerHeight,
  };
  game.vertical
    ? (game.canvas.style.background = "#ffc299")
    : (game.canvas.style.background =
        "linear-gradient(to right, #ffc299 0%, #ffc299 52%, #baffd8 52%, #baffd8 100%)");
  game.canvas.width = game.width;
  game.canvas.height = game.height;
  game.audio = new Audio(
    "https://media-lab-pre-rtve.akamaized.net/proyectos/aula-flamenco/music/palmada.mp3"
  );
};

const start = () => {
  controls(game);
  createCollisions(game);
  game.idInterval = setInterval(() => {
    clear(game);
    game.frameCounter++;
    if (game.vertical) {
      gameVertical();
    } else if (game.horizontal) {
      gameHorizontal();
    }
    moveAll(game);
    drawAll(game);
    clearObstacles(game);
  }, 1000 / game.fps);
};

const gameVertical = () => {
  if (game.frameCounter % levelsVertical[game.level].fps === 0) {
    if (levelsVertical[game.level].level[j] === 1) {
      generateBallLeft(game, levelsVertical[game.level].vy, 2);
    }
    j++;
    if (j === levelsVertical[game.level].level.length) {
      j = 0;
    }
  }
};

const mobileControls = () => {
  document.ontouchstart = (e) => {
    if (isCollisionLeft(game)) {
      game.audio.play();
      pointLeft();
    } else {
      failureLeft();
    }
  };
};

const controls = () => {
  mobileControls();
};

const stop = () => {
  clearInterval(game.idInterval);
};

const drawAll = ({ ballArray, collisionArray }) => {
  let ctx = game.ctx;
  let frameCounter = game.frameCounter;
  ballArray.map((ball) => drawBall(ctx, ball));
  collisionArray.map((collision) => drawCollision(ctx, collision));
};

const moveAll = ({ ballArray }) => {
  ballArray.map((ball) => moveBall(ball));
};

const clearObstacles = ({ ballArray, canvas }) => {
  ballArray = ballArray.filter((ball) => ball.ballY <= canvas.height);
};

const clear = ({ ctx, canvas }) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
