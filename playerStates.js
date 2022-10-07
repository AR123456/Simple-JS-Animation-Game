/**@type {HTMLCanvasElement} */
// particles are closely tied to player state so putting here, but we need the game oject in each player state class too .  Need to do a bit of refactor for that.
import { Dust } from "./particles.js";
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
  // passing n game here
  constructor(state, game) {
    this.state = state;
    // making game a class property
    this.game = game;
  }
  enter() {}
  handleInput() {}
}
// as part of particle refactor need to replace all referances to player object with game. Game object has player on it so will still have access to player via game
export class Sitting extends State {
  constructor(game) {
    // now passing game in as second argument
    super("SITTING", game);
  }
  enter() {
    // now this needs to be this.game.player instead of this.player
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}
export class Running extends State {
  constructor(game) {
    super("RUNNING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }
  handleInput(input) {
    if (input.includes("ArrowDown")) {
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(states.ROLLING, 2);
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
    } else if (input.includes("Enter")) {
      this.player.setState(states.ROLLING, 2);
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

    this.player.frameY = 6;
  }
  handleInput(input) {
    if (!input.includes("Enter") && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    } else if (!input.includes("Enter") && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1);
    } else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") &&
      this.player.onGround()
    ) {
      this.player.vy -= 27;
    }
  }
}
