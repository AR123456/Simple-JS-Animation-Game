/**@type {HTMLCanvasElement}*/

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;
  // Game class wrapper movement and animation logic
  class Game {
    //globals to properites
    constructor(ctx, width, height) {
      // code  run when we instantiate new object
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 500;
      this.enemyTimer = 0;
      this.enemyTypes = ["worm", "ghost", "spider"];
    }
    // update & draw public handle updating and drawing game - enemies player obstacles backgrounds menus
    update(deltaTime) {
      this.enemies = this.enemies.filter((object) => !object.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
        // console.log(this.enemies);
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((object) => object.update(deltaTime));
    }
    draw() {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    // private method to create and set up new enemy
    #addNewEnemy() {
      const randomEnemy =
        this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
      if (randomEnemy === "worm") this.enemies.push(new Worm(this));
      else if (randomEnemy === "ghost") this.enemies.push(new Ghost(this));
      else if (randomEnemy === "spider") this.enemies.push(new Spider(this));
    }
  }
  class Enemy {
    constructor(game) {
      this.game = game;
      // console.log(this.game);
      this.markedForDeletion = false;
      // what horizonatl frame from sprite sheet(s) to be shown
      this.frameX;
      // this can be specific to each enemy or for this project all sprite sheets have 6 frames
      this.maxFrame = 5;
      // account for delta time when animmating frames
      this.frameInterval = 100;
      // accumulator for deltaTime untill it reaches frameInterval
      this.frameTimer = 0;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;
      // have enemys moved beyond left edge of screen
      if (this.x < 0 - this.width) this.markedForDeletion = true;
      if (this.frameTimer > this.frameInterval) {
        // move to text frame in the spritesheet, unless already at the end
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
        // set frame timer back to 0 so it can accumulate delta time again
        this.frameTimer = 0;
      } else {
        //do that
        this.frameTimer += deltaTime;
      }
    }
    draw(ctx) {
      ctx.drawImage(
        this.image,
        // replace x hard coded 0 with vars declared in constructor
        // 0,
        this.frameX * this.spriteWidth,
        // y can stay 0 since sprite sheets for this game have only one row
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = this.game.height - this.height;
      this.image = worm;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height * 0.6;
      this.image = ghost;
      this.vx = Math.random() * 0.1 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      super.draw(ctx);
      ctx.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 310;
      this.spriteHeight = 175;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = Math.random() * this.game.width;
      this.y = 0 - this.height;
      this.image = spider;
      this.vx = 0;
      this.vy = Math.random() * 0.1 + 0.1;
      this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += this.vy * deltaTime;
      if (this.y > this.maxLength) this.vy *= -1;
    }
    // draw spider web
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, 0);
      ctx.lineTo(this.x + this.width / 2, this.y + 10);
      ctx.stroke();
      super.draw(ctx);
    }
  }
  // tell JS which canvas
  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 1;
  // animation loop
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }

  animate(0);
});
