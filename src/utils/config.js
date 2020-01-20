//Game object creation

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