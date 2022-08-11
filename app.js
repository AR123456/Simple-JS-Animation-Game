const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
// dynamic scroll speed - in px
let gameSpeed = 15;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./backgroundLayers/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./backgroundLayers/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./backgroundLayers/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./backgroundLayers/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./backgroundLayers/layer-5.png";
// horizontal position of background image
let x = 0;
// horizontal position of second duplicate background image
let x2 = 2400;
// animate background
function animate() {
  CANVAS_HEIGHT;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer4, x, 0);
  // detect end of image so that we can repeat, draw it twice so canvas is never empty  2400 is the width of the image
  ctx.drawImage(backgroundLayer4, x2, 0);
  // detect end of image so that we can repeat, draw it twice so canvas is never empty  2400 is the width of the image
  if (x < -2400) x = 2400 + x2 - gameSpeed;
  else x -= gameSpeed;
  // detect end of image so that we can repeat, draw it twice so canvas is never empty  2400 is the width of the image
  if (x2 < -2400) x2 = 2400 + x - gameSpeed;
  else x2 -= gameSpeed;
  requestAnimationFrame(animate);
}
animate();
// detect end of image so that we can repeat, draw it twice so canvas is never empty  2400 is the width of the image
