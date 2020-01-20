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
  isMobile: false,
  vertical: false,
  horizontal: true,
  level: 0
};

//Points, Failures and DOM operation

const pointLeft = () => {
  game.point++;
  document.getElementById("point").innerHTML = game.point;
  document.querySelector(".pointLeft").innerHTML = "Ole!";
  document.querySelector(".pointLeft").style.color = "black";
  document.querySelector(".pointLeft").style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".pointLeft").style.opacity = "0";
  }, 500);
};
const pointRight = () => {
  game.point++;
  document.getElementById("point").innerHTML = game.point;
  document.querySelector(".pointRight").innerHTML = "Perfect!";
  document.querySelector(".pointRight").style.color = "black";
  document.querySelector(".pointRight").style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".pointRight").style.opacity = "0";
  }, 500);
};
const failureLeft = () => {
  game.fail++;
  document.querySelector(".pointLeft").innerHTML = "Wrong!";
  document.querySelector(".pointLeft").style.color = "red";
  document.querySelector(".pointLeft").style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".pointLeft").style.opacity = "0";
  }, 500);
  document.getElementById("fail").innerHTML = game.fail;
};
const failureRight = () => {
  game.fail++;
  document.querySelector(".pointRight").innerHTML = "Ups!";
  document.querySelector(".pointRight").style.color = "red";
  document.querySelector(".pointRight").style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".pointRight").style.opacity = "0";
  }, 500);
  document.getElementById("fail").innerHTML = game.fail;
};
