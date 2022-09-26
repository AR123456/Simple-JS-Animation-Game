/**@type {HTMLCanvasElement} */
// switch case for the user input
export class InputHandler {
  constructor() {
    // array of pressed keys
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      if (e.key === "ArrowDown" && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowDown") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
