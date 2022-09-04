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
      this.enemyInterval = 100;
      this.enemyTimer = 0;
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
      // passing deltaTime here so it can be used in enemy class
      this.enemies.forEach((object) => object.update(deltaTime));
    }
    draw() {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    // private method to create and set up new enemy
    #addNewEnemy() {
      this.enemies.push(new Worm(this));
      this.enemies.sort(function (a, b) {
        return a.y - b.y;
      });
    }
  }
  class Enemy {
    // the ghosts worms and spiders animations and different behaviors
    constructor(game) {
      this.game = game;
      // console.log(this.game);
      this.markedForDeletion = false;
    }
    // deltaTime is avalable becasue we passed it in the the parent game class. and update object.update use as argument here
    update(deltaTime) {
      // speed at which the worms are drawn normalize with delta
      this.x -= this.vx * deltaTime;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.drawImage(
        this.image,
        0,
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
  // worm sub class (child class of enemy it will be using the draw and update methods from its parent )

  class Worm extends Enemy {
    //just change what is different keep the rest from parent
    constructor(game) {
      // super tells js to use stuff from parent
      super(game);
      // stuff unique to worm- order is important here
      //1374x171 1374/6
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      // maintain aspect ratio -size on canvas
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.image = worm;
      // ransomize the speed of the worms or speed along vertical axis
      this.vx = Math.random() * 0.1 + 0.1;
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
