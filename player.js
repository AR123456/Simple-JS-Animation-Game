/**@type {HTMLCanvasElement} */
// all the player state imports
import { Running, Sitting } from "./playerStates.js";
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
    // traverse sprite sheet horizontal
    this.frameX = 0;
    // traverse sprite sheet vertical
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    // array of state vales - each state needs it own enter method and handle update method - note "this" is teh entire player class
    this.states = [new Sitting(this), new Running(this)];
    // points to indexes in the states array
    this.currentState = this.states[0];
    // when the player object is initialized for the first time call its enter methond to activate its initial defalt state
    this.currentState.enter();
  }
  update(input) {
    // handle(nput method on playerState, the value of input is comming from app.js Game class
    this.currentState.handleInput(input);
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

    // go up but only if you started on ground
    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
    this.y += this.vy;
    // this code pulls player down and gets stronger the longer the player is in the air
    if (!this.onGround()) this.vy += this.weight;
    // when player is on ground reset velocity to 0
    else this.vy = 0;
  }
  // helper function that returns true if player is on the ground
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  // mothod to allow switching of state the state -arg is index from states array
  setState(state) {
    // index from states array
    this.currentState = this.states[state];
    // speed, sprite animation ect
    this.currentState.enter();
  }
  draw(context) {
    // determines what the player looks like

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
