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
