/**@type {HTMLCanvasElement} */
// keeping track of state with states object
export const states = {
  // using enum to help with state
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};
// hold and pass state as an arg to become property of the class
class State {
  constructor(state) {
    this.state = state;
  }
}
// extend class one of 4 pillars of object oriented programing
export class StandingLeft extends State {
  // if property cannot be found in child JS will look to the parent
  constructor(player) {
    // need to call super before this.
    super("STANDING LEFT");
    // make player class proptery
    this.player = player;
  }
  // enter - everything the player needs to do when entering this state- like change speed or sprite sheet
  enter() {
    // this will run one time when we go into the state
    // animate row 1
    this.player.frameY = 1;
  }
  // listen for a predefined set of inputs and swap to a different state when the correct key is pressed
  handleInput(input) {
    // this will run over and over with each animation frame
    // if we are standing left and press right set state to StandingRight note that we could pass in 1 instead of states.STANDING_RIGHT but the words are more usnderstandable to humans
    if (input === "PRESS right") this.player.setState(states.STANDING_RIGHT);
  }
}
export class StandingRight extends State {
  // if property cannot be found in child JS will look to the parent
  constructor(player) {
    // need to call super before this.
    super("STANDING RIGHT");
    // make player class proptery
    this.player = player;
  }
  // enter - everything the player needs to do when entering this state- like change speed or sprite sheet
  enter() {
    // this will run one time when we go into the state
  }
  // listen for a predefined set of inputs and swap to a different state when the correct key is pressed
  handleInput(input) {
    // this will run over and over with each animation frame
    // if we are in the standing right state and player pushes left set state to standing left. note that we could pass in 0 instead of states.
    if (input === "PRESS left") this.player.setState(states.STANDING_LEFT);
  }
}
