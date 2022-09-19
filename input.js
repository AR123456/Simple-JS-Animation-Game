/**@type {HTMLCanvasElement} */
export default class InputHandler {
  // keep track of keys
  constructor() {
    this.lastKey = "";
    // es6 bind to this keyword to InputHandler
    window.addEventListener("keydown", (e) => {
      // console.log(e.key);
      // expression to validate
      switch (e.key) {
        case "ArrowLeft":
          // if arrowleft was pressed execute this code
          this.lastKey = "PRESS left";
          break;
        case "ArrowRight":
          this.lastKey = "PRESS right";
          break;
        case "ArrowDown":
          this.lastKey = "PRESS down";
          break;
        // case "ArrowUp":
        //   this.lastKey = "PRESS up";
        //   break;
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
        case "ArrowDown":
          this.lastKey = "RELEASE down";
          break;
      }
    });
  }
  draw() {}
  update() {}
}
