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
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update() {
      this.player.update(this.input.keys);
    }
    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  // console.log(game);
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
