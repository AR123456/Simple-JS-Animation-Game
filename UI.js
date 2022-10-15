/**@type {HTMLCanvasElement} */
export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.livesImage = document.getElementById("lives");
  }
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";

    context.fillStyle = "white";
    // score
    context.fillText("Score:  " + this.game.score, 20, 50);
    // show timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
    // lives - draw the dog head for each life
    for (let i = 0; i < this.game.lives; i++) {
      // as we loop offset each new dog head in the index by 20px
      context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    }

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
    ///// shadow  effect
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    // score
    context.fillText("Score:  " + this.game.score, 20 + 2, 50 + 2);
    // show timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText(
      "Time: " + (this.game.time * 0.001).toFixed(1),
      20 + 2,
      80 + 2
    );

    // game over
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score > 5) {
        context.fillText(
          "Boo-yah",
          this.game.width * 0.5 + 2,
          this.game.height * 0.5 - 20 + 2
        );
      } else {
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText(
          "Better luck next time",
          this.game.width * 0.5 + 2,
          this.game.height * 0.5 - 20 + 2
        );
      }
    }
    context.restore();
  }
}
