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
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  // draw takes in context to specify which gane element to draw on
  draw(context) {
    // use the 5 arg version for background images
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
// class to combine and create background layers
export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1image = document.getElementById("layer1");
    this.layer2image = document.getElementById("layer2");
    this.layer3image = document.getElementById("layer3");
    this.layer4image = document.getElementById("layer4");
    this.layer5image = document.getElementById("layer5");

    // instance of Layer class
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5image
    );
    // array to hold background layers
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      // for each layer in the array do this
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      // for each layer in the array do this
      layer.draw(context);
    });
  }
}
