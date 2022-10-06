/**@type {HTMLCanvasElement} */

// enums to make changing state more clear
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
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
      this.player.setState(states.RUNNING, 1);
    }
    // allow going into rolling from anywhere
    else if (input.includes("Enter")) {
      // set to rolling and increase scrolling speed to 2
      this.player.setState(states.ROLLING, 2);
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
      this.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
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
    if (this.player.vy > this.player.weight) {
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
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    }
  }
}
export class Rolling extends State {
  constructor(player) {
    super("ROLLING");
    this.player = player;
  }
  enter() {
    this.frameX = 0;
    this.player.maxFrame = 6;
    // row 6 of sprite sheet
    this.player.frameY = 6;
  }
  handleInput(input) {
    // player should roll when enter key is held down
    // if enter key not held down swith to running state
    if (!input.includes("Enter") && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    }
    // if player is in the air switch to falling
    else if (!input.includes("Enter") && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1);
    }
  }
}
