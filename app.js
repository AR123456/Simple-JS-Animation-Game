/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 700;
const explosion = 1;
// array to work with explosions
// will be pushing explosions created by the constructor into this array, when last frame is reached remove it.
const explosions = [];

// position relative to view port
let canvasPosition = canvas.getBoundingClientRect();

// explosion factory
class Explosion {
  // location fo explosion event , pass in from an event every time animation to be triggered create a new object using this class
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // the width of a single frame in sprite sheet.
    // this.spriteWidth = 1000 / 5;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // maintain aspect ratio- multiplication has better performace the division in JS
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    // create new blank HTML image
    this.image = new Image();
    this.image.scr = "/boom.png";
    // need this .frame to get one frame from sheet x source value used in drawImage methond
    this.frame = 0;
  }
  update() {
    // increment frame each animationFrame
    this.frame++;
  }
  draw() {
    // take stuff from constructor and draw - draw image method  sprite source - s  canvas destination -d
    // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

window.addEventListener("click", function (e) {
  // using explosion  to create an anamation in the place oncanvas we click
  // putting the offset to account for  viewport and canvas H W  in variables - note the -25 for the width of the box needs to be moved to the explosion class for that animation
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  // console.log(e);
  // this will be the cartoon explosion
  // ctx.fillStyle = "white";
  // ctx.fillRect(positionX, positionY, 50, 50);
});
