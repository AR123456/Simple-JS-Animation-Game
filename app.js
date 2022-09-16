/**@type {HTMLCanvasElement} */
window.addEventListener("load", function () {
  // when game is loading show loader, when it is loaded stop showing loading
  const loading = this.document.getElementById("loading");
  loading.style.display = "none";
  // game here
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // end of window
});
