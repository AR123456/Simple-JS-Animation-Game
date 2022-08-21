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
  constructor(x, y) {
    // offset to center the exposion at mouse click location
    // this.x = x;
    // this.y = y;
    // the width of a single frame in sprite sheet.
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // maintain aspect ratio- multiplication has better performace the division in JS
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    //offset to center the exposion at mouse click location
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    // create new blank HTML image
    this.image = new Image();
    this.image.scr = "/boom.png";
    // need this .frame to get one frame from sheet x source value used in drawImage methond
    this.frame = 0;
    this.timer = 0;
  }
  update() {
    this.timer++;
    // run every 10 frames
    if (this.timer % 10 === 0) {
      // increment animationFrame
      this.frame++;
    }
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
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  // pass the click location to the constructor
  explosions.push(new Explosion(positionX, positionY));
  // console.log(e);
  console.log(explosions);
});
// cycle through the explosions array and draw them using animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    // for each one call the constructors update and draw methods
    explosions[i].update();
    explosions[i].draw();
    // stop pushing explosions to the array after 4
    if (explosions[i].frame > 5) {
      // remove
      explosion.splice(i, 1);
      // after removing adjust index
      i--;
    }
  }
  // draw it
  requestAnimationFrame(animate);
}
// kick off the animation loop
animate();
