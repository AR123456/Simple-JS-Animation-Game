/**@type {HTMLCanvasElement}*/
// document.addEventListener("load", function () {
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  // Game class will be wrapper movement and animation logic
  class Game {
    // it is good practice not to call globals from inside constructor.  So adding to game class (pass them in at bottom when creating new Game() instnace) also in the contructor will need to convert them into class properites

    constructor(ctx, width, height) {
      // code here run when we instantiate new object
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      // game class is responsible for adding new enemies to game setting interval to add new enemys to the game here
      this.enemyInterval = 20;
      this.enemyTimer = 0;
      // this.#addNewEnemy();
    }
    // update and draw are public handle the updating and drawing  entire game - enemies player obstacles backgrounds menus
    update() {
      // using enemyInterval and timer to control when new enemies are created
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        // reset back to 0
        this.enemyTimer = 0;
        console.log(this.enemies);
      } else {
        //increment the timer
        this.enemyTimer++;
      }
      // cycle enemies array and run their update fucntion
      this.enemies.forEach((object) => object.update());
    }
    draw() {
      // cycle enemies array and run their draw function
      this.enemies.forEach((object) => object.draw());
    }
    // private method to create and set up a new enemy for game
    #addNewEnemy() {
      // "this" referes to the game object we are currenty inside it carries all the properties in the object
      this.enemies.push(new Enemy(this));
    }
  }
  class Enemy {
    // the ghosts worms and spiders animations and different behaviors
    // passing in game which is the object coming from Game class, the "this"
    constructor(game) {
      // access to game oject inside enemy class
      this.game = game;
      // console.log(game);
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 100;
      this.height = 100;
    }

    update() {
      this.x--;
    }
    draw() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  // tell JS which canvas
  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 1;
  // animation loop
  // will call what needs to be called and loop to move and animate things in game frame by frame
  // animate has access to timestamp

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update();
    game.draw();
    requestAnimationFrame(animate);
  }
  // pass in 0 so first animation is NAN
  animate(0);
  //don't run until all canvas elements have been loaded so put inside the load event listener
});
