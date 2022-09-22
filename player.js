/**@type {HTMLCanvasElement} */
import {
  StandingLeft,
  StandingRight,
  SittingLeft,
  SittingRight,
  RunningLeft,
  RunningRight,
  JumpingLeft,
  JumpingRight,
  FallingLeft,
  FallingRight,
} from "./state.js";
// the player needs to be aware of the game boundaries
export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    // array of possible player states
    // the this keyword represents the entire player object
    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new SittingLeft(this),
      new SittingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FallingLeft(this),
      new FallingRight(this),
    ];
    // player can only have one state at a time, the index of the states array
    this.currentState = this.states[1];
    // point to the image in the html
    this.image = document.getElementById("dogImage");
    //1800x2182
    // width by number of frames in the longest row 9/1800
    this.width = 200;
    // height of sprite sheet / the number of rows 2182/12
    this.height = 181.83;
    // postion from top left of canvas to start draw image put player on ground
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;
    // vertical movement and gravity, vy goes up and wt pulls down
    this.vy = 0;
    this.weight = 0.5;
    // horizontal navigation of sprite sheet
    this.frameX = 0;
    // vertical navigation of sprite sheet
    this.frameY = 0;
    // initally setting to 5
    this.maxFrame = 5;
    // make player run
    this.speed = 0;
    // px per frame speed- move up or down to change player speed
    this.maxSpeed = 10;
    // helper vars for using delta time
    // the fps is limited by each computers capabilitys, if set to number beyond max the max will be used by the individual computer
    this.fps = 40;
    // accumulator for delta time
    this.frameTimer = 0;
    // goal value of frameTimer- number of mil secs each frame should display
    this.frameInterval = 1000 / this.fps;
  }
  //getting delta time from app.js
  draw(context, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      // traversing sprite sheet to animate player
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(input) {
    this.currentState.handleInput(input);
    // horizontal movement
    this.x += this.speed;
    // horizontal boundries
    if (this.x <= 0) this.x = 0;
    else if (this.x >= this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;
    // vertical movement
    this.y += this.vy;
    // if the player is not on the ground (in air )
    if (!this.onGround()) {
      // add weight to bring it down
      this.vy += this.weight;
    } else {
      // player is on the ground so set velocity to 0
      this.vy = 0;
    }
    // keep player from falling through floor - does not seem to be needed
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }
  // public method
  // mechanism that will allow swapping state with key press
  setState(state) {
    this.currentState = this.states[state];
    // where on sprite sheet from the enter method on child class the enum value of states object in states.js
    this.currentState.enter();
  }
  onGround() {
    // when true return that player is on the ground
    return this.y >= this.gameHeight - this.height;
  }
}
