/**@type {HTMLCanvasElement} */
import { StandingLeft, StandingRight } from "./state.js";
// the player needs to be aware of the game boundaries
export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    // array of possible player states
    // the this keyword represents the entire player object
    this.states = [new StandingLeft(this), new StandingRight(this)];
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
    // horizontal navigation
    this.frameX = 0;
    // vertical navigation
    this.frameY = 0;
  }
  //
  draw(context) {
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
    // get the current state from that const
    this.currentState.handleInput(input);
  }
  // public method
  // mechanism that will allow swapping state with key press
  setState(state) {
    this.currentState = this.states[state];
    // where on sprite sheet from the enter method on child class the enum value of states object in states.js
    this.currentState.enter();
  }
}
