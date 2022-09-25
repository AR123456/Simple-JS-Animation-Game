/**@type {HTMLCanvasElement} */
// imports

import { Player } from "./player.js";
import { InputHandler } from "./input.js";
// window
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  // main game constructor that all logic will go through
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      // this = game object expected via class in player js
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update() {
      // run calcs that need to happen
      this.player.update(this.input.keys);
    }
    // context arg vua player.js
    draw(context) {
      // draw images and score
      this.player.draw(context);
    }
  }
  // instance of game class pass in w and h, constructor is triggered
  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  // animate 60 times per sec
  function animate() {
    // clean up old paint
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
  // end of window
});
