/**@type {HTMLCanvasElement}*/
// document.addEventListener("load", function () {
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  // Game class will be wrapper movement and animation logic
  class Game {
    constructor() {
      // code here run when we instantiate new object
      this.enemies = [];
      this.#addNewEnemy();
    }
    // update and draw are public handle the updating and drawing  entire game - enemies player obstacles backgrounds menus
    update() {
      // cycle enemies array and run their update fucnton
      this.enemies.forEach((object) => object.update());
    }
    draw() {
      // cycle enemies array and run their draw function
      this.enemies.forEach((object) => object.draw());
    }
    // private method to create and set up a new enemy for game
    #addNewEnemy() {
      //need way to create new enemies for the game
      this.enemies.push(new Enemy());
    }
  }
  class Enemy {
    // the ghosts worms and spiders animations and different behaviors
    constructor() {
      this.x = 100;
      this.y = 100;
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
  const game = new Game();
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
