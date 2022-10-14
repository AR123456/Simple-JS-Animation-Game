/**@type {HTMLCanvasElement} */
export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    // score
    context.fillText("Score:  " + this.game.score, 20, 50);
    // show timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
    // game over
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score > 5) {
        context.fillText(
          "Boo-yah",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
      } else {
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText(
          "Better luck next time",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
      }
    }
  }
}
