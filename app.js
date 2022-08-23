/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = window.innerWidth;
CANVAS_HEIGHT = canvas.height = window.innerHeight;
// helper vars for timeStamp control of raven generation
let timeToNextRaven = 0;
// after this amount of time trigger next raven
let ravenInterval = 500;
// hold the timeStamp from the prior loop
let lastTime = 0;

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
    // marked for deletion
    // need to remove the ravens from the array after the travel off screen.  could use splice for this
    // here using filter on the array to remove raves the are past the left edge of screen
    this.markedForDeletion = false;
  }
  // update - move raven and adjust any values that need to be before next frame drawn
  update() {
    // move to left
    this.x -= this.directionX;
    // check position on x and if it is off screen ( less that 0) mark for deletion
    if (this.x < 0 - this.width) this.markedForDeletion = true;
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
// the very first time the loop runs this timeStamp is undefined because it only gets created on second loop so need to give it a value on the first call of animate
function animate(timeStamp) {
  //frame by frame
  // create a new raven at interval that will work on old and new computers - time in miliseconds vs computers speed compare timeStamps to generate ravens

  // clear old paint
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // delta time is the value in milliseconds between timestamp from this loop and saved timestamp value from previous loop
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(timeStamp);
  // miliseconds between frames
  timeToNextRaven += deltaTime;
  // console.log(deltaTime);
  if (timeToNextRaven > ravenInterval) {
    // trigger raven class constructor to create one more raven pushed to the ravens array
    ravens.push(new Raven());
    // set time to back to 0 to start count again
    timeToNextRaven = 0;
    // console.log(ravens);
  }
  // cycle through the ravens array and call update and draw
  // this is an array literal- creates a new array on the fly
  // ... is the spread operator - spread the ravens array into this new array - expand into new array
  // for each new object in the new array call update
  // this array literal can be expanded for particles and enemies
  [...ravens].forEach((object) => object.update());
  [...ravens].forEach((object) => object.draw());
  // [...ravens].forEach((object) => {
  //   object.update();
  //   object.draw();
  // });
  // need to remove the ravens from the array after the travel off screen.  could use splice for this
  // here using filter on the array to remove raves the are past the left edge of screen
  ravens = ravens.filter((object) => !object.markedForDeletion);
  // console.log(ravens);
  // call animate again to create endless loop
  // default JS behavior is to pass timestamp(in miliseconds) by default
  requestAnimationFrame(animate);
}
// call the first loop
// the very first time the loop runs this timeStamp is undefined because it only gets created on second loop so need to give it a value on the first call of animate
// the 0 here
animate(0);
