/**@type {HTMLCanvasElement} */
class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  // update needs delta time
  update(deltaTime) {
    // handle movement
    this.x += this.speedX;
    this.y += this.speedY;
    // handle cycle through sprite sheet
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  // draw needs context
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
export class FlyingEnemy extends Enemy {
  constructor(game) {
    // get game w and h from game object
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = 200;
    this.y = 200;
    this.speedX = 2;
    this.maxFrame = 5;
    this.image = document.getElementById("enemy-fly");
  }
  // update needs deltaTime
  update(deltaTime) {
    // get stuff from parent - parents update expects deltaTime
    super.update(deltaTime);
  }
}
export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
  }
}
export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
  }
}
