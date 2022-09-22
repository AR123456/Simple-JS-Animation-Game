/**@type {HTMLCanvasElement} */
// imports
import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";

window.addEventListener("load", function () {
  // when game is loading show loader, when it is loaded stop showing loading
  const loading = this.document.getElementById("loading");
  loading.style.display = "none";
  // game here
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // instansiate a player from the class
  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();

  // delta time to control speed
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // clear out old paint
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // bring in the classes here call their methods
    // console.log(input.lastKey);
    player.update(input.lastKey);
    // want to control how often we serve the next horizontal frame in dog sprite sheet so passing deltaTime to draw
    player.draw(ctx, deltaTime);
    drawStatusText(ctx, input, player);
    // endless animation loop
    requestAnimationFrame(animate);
  }
  animate(0);
  // end of window
});
