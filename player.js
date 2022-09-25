/**@type {HTMLCanvasElement} */
// all the player state imports

// Player class , constructor , draw  updates setting state
export class Player {
  constructor(game) {
    this.game = game;
    // best practice to make the sprite images the W&h needed in the game even though one could with JS
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = 100;
  }
  update() {}
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
