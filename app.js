/**@type {HTMLCanvasElement} */
// imports
import { Player } from "./player.js";
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
    }
    update() {
      // run calcs that need to happen
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
  // end of window
});
