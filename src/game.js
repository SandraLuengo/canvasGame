//https://github.com/IronHackTAs/mario-canvas/blob/master/js/game.js
//https://github.com/Deftwun/BlockBlaster/blob/master/BlockBlaster.js

let game = {
  idInterval: null,
  canvas: null,
  ctx: null,
  fps: 60,
  frameCounterA: 0,
  frameCounterB: 0,
  ballArray: [],
  collisionArray: [],
  keys: {
    TOP_KEY: 38,
    SPACE: 32
  },
  point: 0,
  fail: 0
};

let isMobile = true;

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

let movA = [20,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500]
let i = 0;
let movB = [300,60,60,300,60,60,300,60,60,300,60,60,300,60,60,300,60,60,300,60,60,300,60,60]
let j = 0;
const start = () => {
  createCollisions(game);
  controls();
  game.idInterval = setInterval(() => {
    clear(game);
    game.frameCounterA++;
    if (game.frameCounterA % movA[i] === 0) {
      generateBallA(game);
      game.frameCounterA = 0;
      i++;
    }
    game.frameCounterB++;
    if (game.frameCounterB % movB[j] === 0) {
      generateBallB(game);
      game.frameCounterB = 0;
      j++;
    }
    moveAll(game);
    drawAll(game);
    clearObstacles(game);
  }, 1000 / game.fps);
};

const controls = () => {
  if (!isMobile) {
    document.onkeydown = e => {
      if (e.keyCode === 39) {
        if (isCollisionRight(game)) {
          game.point++;
          document.getElementById("point").innerHTML = game.point;
        } else {
          game.fail++;
          document.getElementById("fail").innerHTML = game.fail;
        }
      } else if (e.keyCode === 37) {
        if (isCollisionLeft(game)) {
          game.point++;
          document.getElementById("point").innerHTML = game.point;
        } else {
          game.fail++;
          document.getElementById("fail").innerHTML = game.fail;
        }
      }
    };
  } else {
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
  }
};
const createCollisions = ({ collisionArray, width, height }) => {
  let newCollisionA = {
    collisionX: width / 4,
    collisionY: (height/4)*3,
    collisionRadio: 30,
    color: "#cc641e"
  };
  let newCollisionB = {
    collisionX: (width / 4) * 3,
    collisionY:  (height/4)*3,
    collisionRadio: 30,
    color: "#00441b"
  };
  collisionArray.push(newCollisionA);
  collisionArray.push(newCollisionB);
};

const stop = () => {
  clearInterval(game.idInterval);
};

let index = 0;

const generateBallA = ({ width }) => {
  let newBall = {
    ballX: width / 4,
    ballY: 50,
    ballRadius: 20,
    vy: 1.2,
    index,
    color: "#cc641e"
  };
  game.ballArray.push(newBall);
  index++;
};

const generateBallB = ({ width }) => {
  let newBall = {
    ballX: (width / 4) * 3,
    ballY: 50,
    ballRadius: 20,
    vy: 1.2,
    index,
    color: "#00441b"
  };
  game.ballArray.push(newBall);
  index++;
};

const drawAll = ({ ballArray, collisionArray }) => {
  let ctx = game.ctx;
  collisionArray.map(collision => drawCollision(ctx, collision));
  ballArray.map(ball => drawBall(ctx, ball));
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

const isCollisionLeft = ({ ballArray, collisionArray }) => {
  return ballArray.some(ball => {
    let PA = ball.ballY - ball.ballRadius;
    let PB = ball.ballY + ball.ballRadius;
    let BA = collisionArray[0].collisionY - collisionArray[0].collisionRadio;
    let BB = collisionArray[0].collisionY + collisionArray[0].collisionRadio;

    let HPA = ball.ballX - ball.ballRadius;
    let HPB = ball.ballX + ball.ballRadius;
    let HBA = collisionArray[0].collisionX - collisionArray[0].collisionRadio;
    let HBB = collisionArray[0].collisionX + collisionArray[0].collisionRadio;

    return (
      PA > BA &&
      PA < BB &&
      PB > BA &&
      PB < BB &&
      HPA > HBA &&
      HPA < HBB &&
      HPB > HBA &&
      HPB < HBB
    );
  });
};

const isCollisionRight = ({ ballArray, collisionArray }) => {
  return ballArray.some(ball => {
    let PA = ball.ballY - ball.ballRadius;
    let PB = ball.ballY + ball.ballRadius;
    let BA = collisionArray[1].collisionY - collisionArray[1].collisionRadio;
    let BB = collisionArray[1].collisionY + collisionArray[1].collisionRadio;
    let HPA = ball.ballX - ball.ballRadius;
    let HPB = ball.ballX + ball.ballRadius;
    let HBA = collisionArray[1].collisionX - collisionArray[1].collisionRadio;
    let HBB = collisionArray[1].collisionX + collisionArray[1].collisionRadio;

    return (
      PA > BA &&
      PA < BB &&
      PB > BA &&
      PB < BB &&
      HPA > HBA &&
      HPA < HBB &&
      HPB > HBA &&
      HPB < HBB
    );
  });
};
