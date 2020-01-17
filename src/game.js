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
  isMobile: true
};


const init = () => {
  game = {
    ...game,
    canvas: document.getElementById("myCanvas"),
    ctx: document.getElementById("myCanvas").getContext("2d"),
    width: window.innerWidth,
    height: window.innerHeight
  };
  game.canvas.width = game.width;
  game.canvas.height = game.height;
};
let index=0;
let i = 0;
let level1A = [0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0];
let j = 0;
let level1B = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
const start = () => {
  controls(game);
  createCollisions(game);
  game.idInterval = setInterval(() => {
    clear(game);
    game.frameCounter++;
    if (game.frameCounter % 60 === 0) {
      if(level1B[j]===1){
        generateBallA(game);
      }
      j++;
    }
    if (game.frameCounter % 60 === 0) {
      if(level1A[i]===1){
        generateBallB(game);
      }
      i++;
    }
    moveAll(game);
    drawAll(game);
    clearObstacles(game);
  }, 1000 / game.fps);
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
