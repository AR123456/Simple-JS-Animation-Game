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
        // have working deltaTime here
        // console.log(deltaTime);
        this.enemyTimer += deltaTime;
      }
      // passing deltaTime here so see if that resolves issue
      this.enemies.forEach((object) => object.update(deltaTime));
    }
    draw() {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    // private method to create and set up a new enemy for game
    #addNewEnemy() {
      this.enemies.push(new Worm(this));
      // sort the array so that worms are not on top of one another
      this.enemies.sort(function (a, b) {
        // sort so worms with vertical y coordinantes have lower index
      });
    }
  }
  class Enemy {
    // the ghosts worms and spiders animations and different behaviors

    constructor(game) {
      // access to game oject
      this.game = game;
      // console.log(this.game);

      this.markedForDeletion = false;
    }
    // deltaTime is avalable becasue we passed it in the the parent game class. use as argument here
    update(deltaTime) {
      // speed at which the worms are drawn normalize with delta
      // this.x--;
      // why is deltatime undefined here ?
      // console.log(deltaTime);
      this.x -= this.vx * deltaTime;
      // on my machine logs of delta @35 so hard coding here
      // this.x -= this.vx * 35;
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
  // creating worm sub class (child class )

  class Worm extends Enemy {
    // could use parent but this enemy will have some different values
    // so here just change what is different keep the rest
    constructor(game) {
      // super tells js to use stuff from parent
      super(game);
      // this is added stuff unique to worm- order is important here
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
