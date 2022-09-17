/**@type {HTMLCanvasElement} */
export default class InputHandler {
  // keep track of keys
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", function (e) {
      console.log(e.key);
      // expression to validate
      switch (e.key) {
        case "ArrowLeft":
          // if arrowleft was pressed execute this code
          this.lastKey = "PRESS left";
      }
    });
    window.addEventListener("keyup", function (e) {
      // expression to validate
      switch (e.key) {
        case "ArrowLeft":
          // if arrowleft was pressed execute this code
          this.lastKey = "RELEASE left";
      }
    });
  }
  draw() {}
  update() {}
}
