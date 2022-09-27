/**@type {HTMLCanvasElement} */
// enum of states object
// each states enter and input handling

// enums to make changing state more clear
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
};
class State {
  constructor(state) {
    this.state = state;
  }
  enter() {}
  handleInput() {}
}
export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  // this method runs once on enter
  enter() {
    // setting the sitting value position on the sprite sheet that is being passed to player.js
    // Note another way to set this would be defineing getters and setters on the player object
    this.player.frameY = 5;
  }
  // this method runs 60 times per second, input here is keys array from input.js
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      // pass setState num corresponding to state to go into, use enum to
      // use words for human readability
      this.player.setState(states.RUNNING);
    }
  }
}
export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
  }
  handleInput(input) {
    if (input.includes("ArrowDown")) {
      this.player.setState(states.SITTING);
    }
  }
}
export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.state = state;
  }
  enter() {}
  handleInput(input) {}
}
