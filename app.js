/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// second collisionCanvas
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
// setting global canvas font size, have to set the family too
ctx.font = "50px Impact";

let timeToNextRaven = 0;

let ravenInterval = 500;

let lastTime = 0;

let ravens = [];

let canvasPosition = canvas.getBoundingClientRect();

// factory class -constructor update draw
class Raven {
  constructor() {
    // 1627x194
    // aspect ratio
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    // offset so that dont have 1/2 birds at top or bottom of screen
    this.y = Math.random() * (canvas.height - this.height);
    // horizontal speed 3 to 8
    this.directionX = Math.random() * 5 + 3;
    // vertical speed - 2.5 to + 2.5
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "/enemy_raven.png";
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    // Math.random()*(max-min+1)+min
    this.flapInterval = Math.random() * 50 + 50;
  }
  // update
  // pass in delta time from the animate function
  update(deltaTime) {
    //top or bottom edge bounce
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY * -1;
    }
    // move to left
    this.x -= this.directionX;
    // move up and down
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
    //speed to cross from right to left
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;

      this.timeSinceFlap = 0;
    }
  }
  // draw - take updated values and any drawing code for a single raven object
  draw() {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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
// use constructor to create raven object
const raven = new Raven();
// scoring
function drawScore() {
  ctx.fillStyle = "black";
  // text, score var, x , y
  ctx.fillText("Score: " + score, 50, 75);
  // shadow effect
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 55, 80);
}
// __ raves before they get to edge of screen
window.addEventListener("click", function (e) {
  // get x and y coords at click in relation to the viewport
  console.log(e.x, e.y);
  /// detect collision by color
  // https://www.w3schools.com/tags/canvas_getimagedata.asp
  // position and size
  // getImageData(sx, sy, sw, sh)
  const detectPixelColor = ctx.getImageData(e.x, e.y, 1, 1);
  // Using this will only pick up the color generated using canvas, not the background color coming from CSS
  // will get a cors error with this console.lob if not using server
  // safety measure to protect from virus hidden in image data
  console.log(detectPixelColor);
});

// animation loop
function animate(timeStamp) {
  //frame by frame
  // clear old paint
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(timeStamp);
  // miliseconds between frames
  timeToNextRaven += deltaTime;
  // console.log(deltaTime);
  // draw score then draw ravens so the score is layered behind the ravens
  drawScore();
  if (timeToNextRaven > ravenInterval) {
    // trigger raven class constructor to create one more raven pushed to the ravens array
    ravens.push(new Raven());
    // set time back to 0 to start count again
    timeToNextRaven = 0;
    // console.log(ravens);
  }
  // this array literal can be expanded for particles and enemies
  // passing delta into update to make it avalible to the update function
  [...ravens].forEach((object) => object.update(deltaTime));
  [...ravens].forEach((object) => object.draw());

  ravens = ravens.filter((object) => !object.markedForDeletion);
  // console.log(ravens);
  // call animate again to create endless loop
  requestAnimationFrame(animate);
}
// call the first loop
animate(0);
