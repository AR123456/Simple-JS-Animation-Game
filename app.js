/**@type {HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;
  // split responsiblitys between objects and how they interact
  // Will handle event listeners, keyboard events, array of currently active keys
  class InputHandler {
    constructor() {
      // add and remove keys from this array as they are being pressed
      this.keys = [];
      // when we created an instance of this class all code inside of it is executed
      window.addEventListener("keydown", function (e) {
        console.log(e);
      });
    }
    update() {}
    draw() {}
    #addNewEnemy() {}
  }
  // player class reacts to inputs or keys as they are being pressed drawing and updating the player
  class Player {
    constructor() {}
    update() {}
    draw() {}
  }
  // handles endlessly scrolling background
  class Background {
    constructor() {}
    update() {}
    draw() {}
  }
  // generate enemies
  class Enemy {
    constructor() {}
    update() {}
    draw() {}
  }
  // responsible for adding animated and removing enemies from the game
  function handleEnemies() {}
  // handles displaying score and other text
  function displayStatusText() {}

  const input = new InputHandler();

  // animation loop - will run 60 times per second
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
  }
  animate(0);
  //
});
