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
    // position vertically
    this.y = this.game.height - this.height;

    //verrtical speed
    this.vy = 0;
    // gravity
    this.weight = 1;
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
    if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;
    // vertical and dive movemements
    this.y += this.vy;
    // go up but only if you started on ground
    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 10;
    // this code pulls player down and gets stronger the longer the player is in the air
    if (!this.onGround()) this.vy += this.weight;
  }
  // helper function that returns true if player is on the ground
  onGround() {
    return this.y >= this.game.height - this.height;
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
