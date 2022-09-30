/**@type {HTMLCanvasElement} */
// helper class that handles logic for each state sepratley and main wrapper class

// need game object, h&w of game , speedModifer to move each layer at a different speed relative to game speed and image
class Layer {
  constructor(game, width, height, speedModifier, image) {
    // convering params into class properites
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {}
  draw() {}
}
