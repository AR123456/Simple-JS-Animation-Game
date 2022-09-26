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
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    this.speed = 0;
    this.maxSpeed = 10;
  }
  update(input) {
    // horizontal
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    // keyup stops movement - no arrow key in the input array
    else this.speed = 0;
    // add boundries to player is not moving off screen
    if (this.x < 0) this.x = 0;
  }
  draw(context) {
    // determines what the player looks like

    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
