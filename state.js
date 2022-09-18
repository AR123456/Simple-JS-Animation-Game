/**@type {HTMLCanvasElement} */

import { ENTERED } from "react-transition-group/Transition";

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
class StandingLeft extends State {
  // if property cannot be found in child JS will look to the parent
  constructor(player) {
    // need to call super before this.
    super("STANDING LEFT");
    // make player class proptery
    this.player = player;
    // enter - everything the player needs to do when entering this state- like change speed or sprite sheet
    enter(){
        // this will run one time when we go into the state 
        // animate row 1 
    }
    // listen for a predefined set of inputs and swap to a different state when the correct key is pressed
    handleInput(input){
        // this will run over and over with each animation frame
    }
  }
}
class StandingRight extends State {
  // if property cannot be found in child JS will look to the parent
  constructor(player) {
    // need to call super before this.
    super("STANDING RIGHT");
    // make player class proptery
    this.player = player;
    // enter - everything the player needs to do when entering this state- like change speed or sprite sheet
    enter(){
        // this will run one time when we go into the state 
    }
    // listen for a predefined set of inputs and swap to a different state when the correct key is pressed
    handleInput(input){
        // this will run over and over with each animation frame
    }
  }
}
