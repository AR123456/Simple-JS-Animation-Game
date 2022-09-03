/**@type {HTMLCanvasElement}*/
// document.addEventListener("load", function () {
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  // Game class will be wrapper movement and animation logic
  class Game {
    // good practice not to call globals from inside constructor convert them into class properites
    constructor(ctx, width, height) {
      // code  run when we instantiate new object
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
    }
    // update and draw are public handle the updating and drawing  entire game - enemies player obstacles backgrounds menus
    update(deltaTime) {
      this.enemies = this.enemies.filter((object) => !object.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
        // console.log(this.enemies);
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((object) => object.update());
    }
    draw() {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    // private method to create and set up a new enemy for game
    #addNewEnemy() {
      this.enemies.push(new Enemy(this));
    }
  }
  class Enemy {
    // the ghosts worms and spiders animations and different behaviors
    constructor(game) {
      // access to game oject
      this.game = game;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 100;
      this.height = 100;
      this.markedForDeletion = false;
    }

    update() {
      this.x--;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  // creating worm sub class (child class )
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
