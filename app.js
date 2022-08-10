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
// playerState so no longer needing to enter text string for row location
let playerState = "run";

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
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
//   state is the objects in the array
// index is position in array
animationStates.forEach((state, index) => {
  // for each element in the array create this data structure
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
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

  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  // // horizontal
  let frameX = spriteWidth * position;
  // // vertical

  let frameY = spriteAnimations[playerState].loc[position].y;
  // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dy)
  ctx.drawImage(
    playerImage,
    // sx
    frameX,
    //sy
    frameY,
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
