/**@type {HTMLCanvasElement} */
// all the player state imports
import { Sitting, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    // best practice to make the sprite images the W&h needed in the game even though one could with JS
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player");
    // index horizonal frame
    this.frameX = 0;
    // vertical position in sprite sheet
    this.frameY = 0;
    // number of frames in the row- adjust with state changes
    this.maxFrame;
    // use deltaTime to control speed of animation through spritesheet
    this.fps = 20;
    // how long frame should stay on screen
    this.frameInterval = 1000 / this.fps;
    // 0 to frame interval
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    // order needs to be same as enum
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.x += this.speed;
    // player should be able to mover left and right in all states
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;

    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // cycle between 0 and rows max frames
    // if (this.frameX < this.maxFrame) this.frameX++;
    // else this.frameX = 0;
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  draw(context) {
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
