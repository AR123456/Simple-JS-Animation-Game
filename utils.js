/**@type {HTMLCanvasElement} */
// home of helper functions

// function to display last key
export function drawStatusText(context, input, player) {
  context.font = "28px Helvetica";
  context.fillText("Last input: " + input.lastKey, 10, 20);
  context.fillText("Active state: " + player.currentState.state, 10, 70);
}
