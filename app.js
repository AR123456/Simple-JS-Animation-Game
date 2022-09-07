/**@type {HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;
  class Game {
    constructor() {}
    update() {}
    draw() {}
    #addNewEnemy() {}
  }
  class Enemy {
    constructor() {}
    update() {}
    draw() {}
  }
  // animation loop
  const game = new Game();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
  }
  animate(0);
  //
});
