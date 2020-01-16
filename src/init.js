window.onload = function() {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("stop-button").onclick = () => {
    stopGame();
  };
  
  const startGame = () => {
    init();
    start();
  };

  const stopGame = () => {
    stop();
  };
};
