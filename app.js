const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

//  image class constructor
const playerImage = new Image();
playerImage.src = "/shadow_dog.png";
const spriteWidth = 575;
// 5230 / 10
const spriteHeight = 523;
// horizontal
let frameX = 0;
// vertical
let frameY = 1;
// to slow the animation down
let gameFrame = 0;
//slow down animation 0 stops higher number slower animation
const staggerFrames = 5;
// container to hold all data for animation
const spriteAnimations = [];
const animationStates = [
  // data map that matches the sprite sheet for every row an object
  {
    // name property name of row  and number of frames in row
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
];
// using for each to populate - state is the objects in the array
// index is position in array
animationStates.forEach((state, index) => {
  // for each element in the array create this data structure
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    // calc x and y coords
    // positionX is the j varialble from for loop
    let positionX = j * spriteWidth;
    // position x is the index
    let positionY = index * spriteHeight;
    // every time we do this
    frames.loc.push({ x: positionX, y: positionY });
  }
  // key value pair
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);
// animation loop
function animate() {
  // frist clear anything out of canvas that is there
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

  let position = Math.floor(gameFrame / staggerFrames) % 6;
  frameX = spriteWidth * position;
  // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dy)
  ctx.drawImage(
    playerImage,
    // sx
    frameX,
    //sy
    frameY * spriteHeight,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
