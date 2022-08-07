const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx);
// for sprite animation will use ctx.drawImage method

// settign h&W const same as what is in css
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

// built in image class constructor
const playerImage = new Image();
playerImage.src = "/shadow_dog.png";
// move box over to the right
let x = 0;

// animation loop
function animate() {
  // frist clear anything out of canvas that is there
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
  ctx.fillRect(x, 50, 100, 100);
  // move box over to the right
  x++;
  requestAnimationFrame(animate);
}
animate();
