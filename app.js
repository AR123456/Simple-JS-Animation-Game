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
      this.enemies = [];
    }
    // update and draw are public handle the updating and drawing  entire game - enemies player obstacles backgrounds menus
    update() {}
    draw() {}
    // private method to create and set up a new enemy for game
    #addNewEnemy() {
      //need way to create new enemies for the game
    }
  }

  class Enemy {
    // the ghosts worms and spiders animations and different behaviors
    constructor() {}

    update() {}
    draw() {}
  }
  // animation loop
  // will call what needs to be called and loop to move and animate things in game frame by frame
  // animate has access to timestamp
  let lastTime = 1;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;
    console.log(deltaTime);
    console.log("hello");
    requestAnimationFrame(animate);
  }

  // animate();
  //don't run until all canvas elements have been loaded so put inside the load event listener
});
