const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx);
// for sprite animation will use ctx.drawImage method

// setting h&W const same as what is in css
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

// built in image class constructor
const playerImage = new Image();
playerImage.src = "/shadow_dog.png";
const spriteWidth = 575;
// 5230 / 10
const spriteHeight = 523;
// horizontal
let frameX = 0;
// vertical
let frameY = 2;
// to slow the animation down
let gameFrame = 0;
// using to slow down animation by amount const is =t0
// 0 stops by the the higher the number the slower to animation
const staggerFrames = 5;
// animation loop
function animate() {
  // frist clear anything out of canvas that is there
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

  //can pass in 3 ,5 or 0 ards depending on how much control is needed
  // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dy)
  // one frame of the sprite sheet
  ctx.drawImage(
    playerImage,
    // sx
    frameX * spriteWidth,
    //sy
    frameY * spriteHeight,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  // only increase the game frame if
  if (gameFrame % staggerFrames == 0) {
    // a simple way to run the animation
    if (frameX < 6) frameX++;
    else frameX = 0;
  }
  // for each loop increase by one
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();