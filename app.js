const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
// dynamic scroll speed - in px
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./backgroundLayers/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./backgroundLayers/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./backgroundLayers/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./backgroundLayers/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./backgroundLayers/layer-5.png";

// create 5 instances of javascript object   layer class and put inside an array that can be cycled through to update and draw them
// classes are used to create many similar obects - class is the blueprint -some shared properties and methods
class Layer {
  // method - function attached to an object
  constructor(image, speedModifier) {
    //  starting at 0 use this syntax and all layes will have the same width of 2400px and height of 700px
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    // start second image where the first ends
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  // update moves layers horizontally when the scroll off screen
  update() {
    // make game speed dynamic
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      // take care of gap between images
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      // take care of gap between images
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  // take info and draw on canvas
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}
// the word new looks for the class and triggers its constructor
const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2 = new Layer(backgroundLayer2, 0.5);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.5);
const layer5 = new Layer(backgroundLayer5, 1);
// animate background
function animate() {
  CANVAS_HEIGHT;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer4.update();
  layer4.draw();
  layer5.update();
  layer5.draw();
  requestAnimationFrame(animate);
}
animate();
