

let game = {
  idInterval: null,
  canvas: null,
  ctx: null,
  fps: 60,
  frameCounter: 0,
  ballArray: [],
  collisionArray: [],
  keys: {
    LEFT_KEY: 37,
    RIGHT_KEY: 39
  },
  point: 0,
  fail: 0,
  isMobile: true,
  vertical: false,
  horizontal: true, 
  level: 0
};

const init = () => {
  game = {
    ...game,
    canvas: document.getElementById("myCanvas"),
    ctx: document.getElementById("myCanvas").getContext("2d"),
    width: window.innerWidth,
    height: window.innerHeight
  };
  game.vertical ? game.canvas.style.background = 'rgba(255,194,153,1)' : game.canvas.style.background = 'linear-gradient(to right, rgba(255,194,153,1) 0%, rgba(255,194,153,1) 52%, rgba(186,255,216,1) 52%, rgba(186,255,216,1) 100%)'
  game.canvas.width = game.width;
  game.canvas.height = game.height;
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

const gameHorizontal = () => {
  if (game.frameCounter % levels[game.level].fpsLeft === 0) {
    if (levels[game.level].level1Left[j] === 1) {
      generateBallLeft(game, levels[game.level].vLeft, 4);
    }
    j++;
    if (j === levels[game.level].level1Left.length) {
      j = 0;
    }
  }
  if (game.frameCounter % levels[game.level].fpsRight === 0) {
    if (levels[game.level].level1Right[i] === 1) {
      generateBallRight(game, levels[game.level].vRight);
    }
    i++;
    if (i === levels[game.level].level1Right.length) {
      i = 0;
    }
  }
};

const mobileControls = () => {
  document.ontouchstart = e => {
    if (e.touches[0].clientX > 0 && e.touches[0].clientX < game.width / 2) {
      if (isCollisionLeft(game)) {
        game.point++;
        document.getElementById("point").innerHTML = game.point;
      } else {
        game.fail++;
        document.getElementById("fail").innerHTML = game.fail;
      }
    } else if (
      e.touches[0].clientX > game.width / 2 &&
      e.touches[0].clientX < game.width
    ) {
      if (isCollisionRight(game)) {
        game.point++;
        document.getElementById("point").innerHTML = game.point;
      } else {
        game.fail++;
        document.getElementById("fail").innerHTML = game.fail;
      }
    }
  };
};

const desktopControls = (LEFT_KEY, RIGHT_KEY) => {
  document.onkeydown = e => {
    if (e.keyCode === RIGHT_KEY) {
      if (isCollisionRight(game)) {
        game.point++;
        document.getElementById("point").innerHTML = game.point;
      } else {
        game.fail++;
        document.getElementById("fail").innerHTML = game.fail;
      }
    } else if (e.keyCode === LEFT_KEY) {
      if (isCollisionLeft(game)) {
        game.point++;
        document.getElementById("point").innerHTML = game.point;
      } else {
        game.fail++;
        document.getElementById("fail").innerHTML = game.fail;
      }
    }
  };
};

const controls = ({ isMobile, keys: { LEFT_KEY, RIGHT_KEY } }) => {
  if (isMobile) {
    mobileControls();
  } else {
    desktopControls(LEFT_KEY, RIGHT_KEY);
  }
};

const stop = () => {
  clearInterval(game.idInterval);
};

const drawAll = ({ ballArray, collisionArray }) => {
  let ctx = game.ctx;
  ballArray.map(ball => drawBall(ctx, ball));
  collisionArray.map(collision => drawCollision(ctx, collision));
};

const moveAll = ({ ballArray }) => {
  ballArray.map(ball => moveBall(ball));
};

const clearObstacles = ({ ballArray, canvas }) => {
  ballArray = ballArray.filter(ball => ball.ballY <= canvas.height);
};

const clear = ({ ctx, canvas }) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
