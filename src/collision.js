const drawCollision = (
  ctx,
  { collisionX, collisionY, collisionRadio, color }
) => {
  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.arc(collisionX, collisionY, collisionRadio, 0, Math.PI * 2);
  ctx.closePath();
  ctx.strokeStyle = 'red';
  ctx.stroke();
};

const createCollisions = ({ collisionArray, width, height }) => {
  let newCollisionA = {
    collisionX: width / 4,
    collisionY: (height / 4) * 3,
    collisionRadio: 30,
    color: "#cc641e"
  };
  let newCollisionB = {
    collisionX: (width / 4) * 3,
    collisionY: (height / 4) * 3,
    collisionRadio: 30,
    color: "#00441b"
  };
  collisionArray.push(newCollisionA);
  collisionArray.push(newCollisionB);
};

const isCollisionLeft = ({ ballArray, collisionArray }) => {
  return ballArray.some(ball => collision( ball, collisionArray, 0 )); 
};

const isCollisionRight = ({ ballArray, collisionArray }) => {
   return ballArray.some(ball => collision( ball, collisionArray, 1 ));
};

const collision = (ball, collisionArray, position) => {
  let ballTop =  ball.ballY  - ball.ballRadius;
  let ballBottom =  ball.ballY  + ball.ballRadius;
  let collisionTop = collisionArray[position].collisionY - collisionArray[position].collisionRadio;
  let collisionBottom = collisionArray[position].collisionY + collisionArray[position].collisionRadio;
  let ballRight = ball.ballX - ball.ballRadius;
  let ballLeft = ball.ballX + ball.ballRadius;
  let collisionRight = collisionArray[position].collisionX - collisionArray[position].collisionRadio;
  let collisionLeft = collisionArray[position].collisionX + collisionArray[position].collisionRadio;
  return (
    ballTop > collisionTop &&
    ballTop < collisionBottom &&
    ballBottom > collisionTop &&
    ballBottom < collisionBottom &&
    ballRight > collisionRight &&
    ballRight < collisionLeft &&
    ballLeft > collisionRight &&
    ballLeft < collisionLeft
  );
};
