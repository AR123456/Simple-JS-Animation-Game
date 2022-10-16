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

  update() {
    // start off fast then move slowly towards target(upper left of screen)
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }
  draw(context) {
    context.font = "20px Creepster";
    context.fillStyle = "white";
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = "black";
    context.fillText(this.value, this.x - 2, this.y - 2);
  }
}
