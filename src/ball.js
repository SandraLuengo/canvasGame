let vy = 0.5;

const drawBall = (ctx, { ballX, ballY, ballRadius, color }) => {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

const moveBall = ball => {
  ball.ballY += ball.vy;
};

const generateBallLeft = ({ width }, vLeft, positionX) => {
  let newBall = {
    ballX: (width / positionX),
    ballY: 50,
    ballRadius: 20,
    vy: vLeft,
    color: "#cc641e"
  };
  game.ballArray.push(newBall);
};

const generateBallRight = ({ width }, vRight) => {
  let newBall = {
    ballX: (width / 4) * 3,
    ballY: 50,
    ballRadius: 20,
    vy: vRight,
    color: "#00441b"
  };
  game.ballArray.push(newBall);
};