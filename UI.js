import { isContext } from "vm";

/**@type {HTMLCanvasElement} */
export class UI {
  constructor() {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Impact";
  }
  draw(context) {
    context.font = this.fontSize + "px" + this.fontFamily;
    context.textAlign = "left";
    // this is coming from game class
    context.fillStyle = this.game.fontColor;

    // score
    context.fillStyle("Score:  " + this.game.score, 20, 50);
  }
}
