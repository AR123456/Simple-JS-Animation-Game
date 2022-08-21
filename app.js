/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 700;

// array to work with explosions
// will be pushing explosions created by the constructor into this array, when last frame is reached remove it.
const explosions = [];

// position relative to view port
let canvasPosition = canvas.getBoundingClientRect();

// explosion factory
class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // maintain aspect ratio- multiplication has better performace the division in JS
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x;
    this.y = y;
    // create new blank HTML image
    this.image = new Image();
    this.image.src = "./boom.png";
    // need this .frame to get one frame from sheet x source value used in drawImage methond
    this.frame = 0;
    this.timer = 0;
    // pass in radiant of 360 deg
    this.angle = Math.random() * 6.2;
    // adding boom sound
    this.sound = new Audio();
    this.sound.src = "./boom.wav";
  }
  update() {
    // only play the sound one time
    if (this.frame === 0) this.sound.play();
    this.timer++;
    // run every 10 frames
    if (this.timer % 10 === 0) {
      // increment animationFrame
      this.frame++;
    }
  }
  draw() {
    // save so that the effect is on just one draw call
    ctx.save();
    // rotate around its center
    ctx.translate(this.x, this.y);
    // rotate the entire canvas context by random rotate angle
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      // doing this in the translate now so do not need here
      // can use 0 and 0
      // this.x,
      // this.y,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    // restore to the original draw point
    ctx.restore();
  }
}
/////  NOTE this code could be re used to show the animation with a colison instead of mouse click  or could be other event or user input that triggers ////
window.addEventListener("click", function (e) {
  createAnimation(e);
});
// cool dust trail
// window.addEventListener("mousemove", function (e) {
//   createAnimation(e);
// });

// putting code into re usable funtion
function createAnimation(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  // pass the click location to the constructor
  explosions.push(new Explosion(positionX, positionY));
  // console.log(e);
  console.log(explosions);
}

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
      explosions.splice(i, 1);
      // after removing adjust index
      i--;
    }
  }
  // draw it
  requestAnimationFrame(animate);
}
// kick off the animation loop
animate();
