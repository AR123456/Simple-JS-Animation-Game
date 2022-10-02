/**@type {HTMLCanvasElement} */

import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
// window
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      // ground level for the game - the order is important, needs to be before the player is instantiated
      // this can be adjusted based on what enviroment the player is is
      this.groundMargin = 80;
      // using speed in background js
      // at start of game player is sitting so speed 0- changing this in playerStates.js
      this.speed = 0;
      this.maxSpeed = 4;
      // instantiate background
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
    }
    draw(context) {
      // background first so it is behind player
      this.background.draw(context);
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  // console.log(game);
  // setting up Delta Time
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;
    // clean up old paint
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
  // end of window
});
