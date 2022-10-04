/**@type {HTMLCanvasElement} */
class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    // this will be shared with all enemies so define here
    this.markedForDeletion = false;
  }
  // update needs delta time
  update(deltaTime) {
    // handle movement
    // account for speed when player is moving- when player is moving the enemies should appear to move coordinated with the dynamic player and background
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    // handle cycle through sprite sheet
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // when an enemy gets to left edge of screen remove it from the array
    // horizontal coordianate of the enemy + enemy width less 0 mark it for deletion
    if (this.x + this.width < 0) this.markedForDeletion = true;
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
    // randomize spacing by randomizing x coordiante
    this.x = this.game.width + Math.random() * this.game.width + 0.5;
    // random start y only on top half of game
    this.y = Math.random() * this.game.height * 0.5;
    // randomize enemy speed
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById("enemy-fly");
    // give flying enemies a bobbing like movement - only flying get so define here - map along sin wave
    this.angle = 0;
    // va velocity angle
    this.va = Math.random() * 0.1 + 0.1;
  }
  // update needs deltaTime
  update(deltaTime) {
    // get stuff from parent - parents update expects deltaTime
    super.update(deltaTime);
    // now do the stuff that just applies to flying enemeys
    this.angle += this.va;
    this.y += Math.sin(this.angle);
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
