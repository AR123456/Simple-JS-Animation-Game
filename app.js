/**@type {HTMLCanvasElement} */
// imports

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
    }
    update() {
      // run calcs that need to happen
    }
    draw() {
      // draw images and score
    }
  }

  // end of window
});
