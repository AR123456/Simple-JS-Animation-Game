/**@type {HTMLCanvasElement} */
// home of helper functions

// function to display last key
export function drawStatusText(context, input) {
  context.font = "30px Helvetica";
  context.fillText("Last input: " + input.lastKey, 10, 20);
}
