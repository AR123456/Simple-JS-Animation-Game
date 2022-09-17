/**@type {HTMLCanvasElement} */
// imports
import Player from "./player.js";
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

  function animate() {
    // bring in al the classes here to call their methods
  }
  // end of window
});
