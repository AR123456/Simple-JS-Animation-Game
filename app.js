/**@type {HTMLCanvasElement}*/
// wait to run the js until all the html, images and CSS have been loaded.  This wraps everything
// document.addEventListener("load", function () {
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  // Game class will be wrapper and contain all the movement and animation logic
  class Game {
    constructor() {
      this.enemies = [];
    }
    // update and draw are public - need to be called from animation loop that is outside the constructor - they will handle the updating and drawing for the entire game - enemies player obstacles backgrounds menues
    update() {}
    draw() {}
    // private method will be called when need to create and set up a new enemy for game
    // if methods name starts with # it will be a private class
    // ic can only be called from within game class to manage some kind of internal functionality.  In this case adding a new enemy into the this.enemies array
    #addNewEnemy() {
      //need way to create new enemies for the game
    }
  }
  // in this class declare blueprint - when called from the #addNewEnemy method it will create one new enemy ogject
  class Enemy {
    // the ghosts worms and spiders will be crated by the enemy class but they will have different animations and different behaviors
    constructor() {}
    // update and draw methods in this class will handle updating and drawing each individual enemy position movement patterns sprite animation
    update() {}
    draw() {}
  }
  // animation loop
  // will call what needs to be called and loop to move and animate things in game frame by frame
  // animate has access to timestamp
  let lastTime = 1;
  function animate(timeStamp) {
    // do this frame by frame
    // start off by clearing the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // some code -
    // request AnimationFrame refreshes based on the machine so is scalable to all devices - only serve the next frame based on time between previous animate call and current animate call. Use built in timestamp. AKA delta time
    const deltaTime = timeStamp - lastTime;
    // calculation done so reassign so ready to use for next calculation
    lastTime = timeStamp;
    console.log(deltaTime);
    console.log("hello");
    requestAnimationFrame(animate);
  }

  // animate();
  //don't run until all canvas elements have been loaded so put inside the load event listener
});
