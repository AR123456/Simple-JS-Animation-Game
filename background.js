/**@type {HTMLCanvasElement} */
// helper class that handles logic for each  layer (state) sepratley and main wrapper class

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
  update() {
    // y is always 0
    // scroll the background sprite with no break when starting at the first frame again.
    if (this.x - this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  // draw takes in context to specify which gane element to draw on
  draw(context) {
    // use the 5 arg version for background images
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
// class to combine and create background layers
export class Background {
  constructor() {}
  update() {}
  draw() {}
}
