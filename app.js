/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = window.innerWidth;
CANVAS_HEIGHT = canvas.height = window.innerHeight;
// holder for all raven objects
let ravens = [];

let canvasPosition = canvas.getBoundingClientRect();

// factory class -constructor update draw
class Raven {
  constructor() {
    this.width = 100;
    this.height = 50;
    this.x = canvas.width;
    // offset so that dont have 1/2 birds at top or bottom of screen
    this.y = Math.random() * (canvas.height - this.height);
    // horizontal speed 3 to 8
    this.directionX = Math.random() * 5 + 3;
    // vertical speed - 2.5 to + 2.5
    this.directionY = Math.random() * 5 - 2.5;
  }
  // update - move raven and adjust any values that need to be before next frame drawn
  update() {
    // move to left
    this.x -= this.directionX;
  }
  // draw - take updated values and any drawing code for a single raven object
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
// use constructor to create raven object
const raven = new Raven();
// event listener

// animation loop
function animate(timeStamp) {
  //frame by frame
  // clear old paint
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  raven.update();
  raven.draw();
  // call animate again to create endless loop
  requestAnimationFrame(animate);
}
// call the first loop
animate();
