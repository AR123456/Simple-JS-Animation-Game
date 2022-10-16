/**@type {HTMLCanvasElement} */

export class floatingMessage {
  // value and postion of floating text
  constructor(value, x, y, targetX, targetY) {
    // text will appear at x,y then float to targetX targetY and disapear
    // making class properties
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    // making properties so it disapears and time how long on screen
    this.markedForDeletion = false;
    this.timer = 0;
  }

  update(deltaTime) {}
  draw(context) {}
}
