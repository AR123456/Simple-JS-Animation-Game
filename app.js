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
// animation loop
function animate() {
  // frist clear anything out of canvas that is there
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

  //can pass in 3 ,5 or 0 ards depending on how much control is needed
  // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dy)
  // one frame of the sprite sheet
  ctx.drawImage(
    playerImage,
    // get 5th image in  row of sprite sheet
    5 * spriteWidth,
    // get third row
    2 * spriteHeight,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  requestAnimationFrame(animate);
}
animate();
