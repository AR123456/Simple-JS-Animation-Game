/**@type {HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  // event listeners, keyboard events, array of currently active keys
  class InputHandler {
    constructor() {
      // add and remove keys from this array as they are being pressed
      this.keys = [];
      // when we created an instance of this class all code inside of it is executed. Note to take advantage of the lexical scoping of this so that the this.keys array is defined need to use an es6 arrow function for event listener
      //   window.addEventListener("keydown", function (e) {
      window.addEventListener("keydown", (e) => {
        // if somethings index is -1 it means it is not present in the array
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          // push to keys array
          this.keys.push(e.key);
        }
        // console.log(e.key, this.keys);
      });
      window.addEventListener("keyup", (e) => {
        // don't allow duplicate "ArrowDown" entries.  if somethings index is -1 it means it is not present in the array
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          // push to keys array
          //array.splice(index, howmany)
          this.keys.splice(this.keys.indexOf(e.keys), 1);
        }
        // console.log(e.key, this.keys);
      });
    }
    update() {}
    draw() {}
    #addNewEnemy() {}
  }
  //reacts to inputs or keys as pressed, drawing and updating player
  class Player {
    // player object needs to be aware of game boundaries
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      // the player itself 1800 x400
      this.width = 200;
      this.height = 200;
      this.x = 10;
      // put player on the ground
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImage");
    }

    // draw needs to know which canvas to draw on
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        //change which place in row- horizontal
        5 * this.width,
        // change row of spritesheet
        1 * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    // move player around
    update() {
      this.x++;
    }
  }
  // endlessly scrolling background
  class Background {
    constructor() {}
    update() {}
    draw() {}
  }
  // generate enemies
  class Enemy {
    constructor() {}
    update() {}
    draw() {}
  }
  // responsible for adding animated and removing enemies from the game
  function handleEnemies() {}
  // handles displaying score and other text
  function displayStatusText() {}
  // instantiate classes so its code will be executed
  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);

  // animation loop - will run 60 times per second
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    player.update();
    requestAnimationFrame(animate);
  }
  animate(0);
  //
});
