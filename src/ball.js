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

const generateBallA = ({ width }) => {
  let newBall = {
    ballX: width / 4,
    ballY: 50,
    ballRadius: 20,
    vy: 0.9,
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
    vy: 0.9,
    index,
    color: "#00441b"
  };
  game.ballArray.push(newBall);
  index++;
};