/**@type {HTMLCanvasElement} */
// imports
import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils";
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
  player.draw(ctx);
  const input = new InputHandler();

  function animate() {
    // bring in the classes here call their methods
    console.log(input.lastKey);
    // drawStatusText(ctx, input);
    // endless animation loop
    requestAnimationFrame(animate);
  }
  animate();
  // end of window
});
