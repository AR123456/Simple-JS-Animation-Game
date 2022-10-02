/**@type {HTMLCanvasElement} */

// enums to make changing state more clear
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
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
  enter() {
    this.frameX = 0;
    this.player.maxFrame = 4;
    this.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      // passing in game speed
      this.player.setState(states.RUNNING, 1);
    }
  }
}
export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.frameX = 0;
    this.player.maxFrame = 8;
    this.player.frameY = 3;
  }
  handleInput(input) {
    if (input.includes("ArrowDown")) {
      // passing in game speed when sitting
      this.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      // passing in game speed when jumping
      this.player.setState(states.JUMPING, 1);
    }
  }
}
export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.player.vy -= 30;
    this.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 1;
  }
  handleInput(input) {
    // check for values on properties of player if vy is entering positive values and is more than the player weight player is falling
    if (this.player.vy > this.player.weight) {
      // passing in game speed when falling
      this.player.setState(states.FALLING, 1);
    }
  }
}
export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 2;
  }
  handleInput(input) {
    // wait for player to be on grouund
    if (this.player.onGround()) {
      // passing in game speed when running
      this.player.setState(states.RUNNING, 1);
    }
  }
}
