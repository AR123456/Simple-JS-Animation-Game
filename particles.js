/**@type {HTMLCanvasElement} */

// stuff shared by all particle types
class Particle {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    // adjust this to increase length of trail
    this.size *= 0.97;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}
// will need the exproted particesl in playerStates.js
export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0,0,0,0.2)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
export class Splash extends Particle {}
export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.image = document.getElementById("fire");
    // adjust the size of fire particles
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    // rotating the fire image
    this.angle = 0;
    // velocity of angle - change speed of rotation of fire image
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    super.update();
    this.angle += this.va;
    // horizontal wobble
    this.x += Math.sin(this.angle * 5);
  }
  draw(context) {
    // wrapping code between save and restore so the canvas setting between them only effect this particle
    context.save();
    // translate rotation center point to a location on the center of item to be rotated
    context.translate(this.x, this.y);
    // the fire image is a rectangle
    context.rotate(this.angle);

    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
