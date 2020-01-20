let image = null;
let frames = 4;
let frameIndex = 0;

const drawBall = (ctx ,{ ballX, ballY, ballWidth, ballHeight }) => {
  image = document.getElementById('source');
  /* ctx.drawImage(
  image,
  frameIndex * Math.floor(image.width / frames),
  0,
  Math.floor(image.width / frames),
  image.height,
  ballX,
  ballY,
  50,
  50
);  
 */
ctx.drawImage(image, ballX, ballY,ballWidth, ballHeight); //--> static image
//animateBall(); // --> for movement
};

animateBall = () => {
  if (game.frameCounter % 40 === 0) {
    frameIndex ++;
    if(frameIndex > 3) {
      frameIndex = 0;
    }
  }
}

const moveBall = ball => {
  ball.ballY += ball.vy;
};


const generateBallLeft = ({ width }, vLeft, positionX) => {
  let newBall = {
    ballX: (width / positionX) - 20,
    ballY: 50,
    ballWidth: 40,
    ballHeight: 40,
    vy: vLeft
  };
  game.ballArray.push(newBall);
};

const generateBallRight = ({ width }, vRight) => {
  let newBall = {
    ballX: (width / 4) * 3 - 20,
    ballY: 50,
    ballWidth: 40,
    ballHeight: 40,
    vy: vRight
  };
  game.ballArray.push(newBall);
};