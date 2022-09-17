/**@type {HTMLCanvasElement} */
export default class InputHandler {
  // keep track of keys
  constructor() {
    this.lastKey = "";
    // need to bind to this keyword to the InputHandler this on InputHandler object by using es6 syntax
    window.addEventListener("keydown", (e) => {
      // expression to validate
      switch (e.key) {
        case "ArrowLeft":
          // if arrowleft was pressed execute this code
          this.lastKey = "PRESS left";
          break;
        case "ArrowRight":
          this.lastKey = "PRESS right";
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      // expression to validate
      switch (e.key) {
        case "ArrowLeft":
          // if arrowleft was pressed execute this code
          this.lastKey = "RELEASE left";
          break;
        case "ArrowRight":
          this.lastKey = "RELEASE right";
          break;
      }
    });
  }
  draw() {}
  update() {}
}
