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
  constructor() {}
  enter() {}
  handleInput() {}
}
export class Running extends State {
  constructor() {}
  enter() {}
  handleInput() {}
}
export class Jumping extends State {
  constructor() {}
  enter() {}
  handleInput() {}
}
