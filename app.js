/**@type {HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;
  // enemies array
  let enemies = [];

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
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      // the player itself 1800 x400
      this.width = 200;
      this.height = 200;
      this.x = 10;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImage");
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
    }

    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(input) {
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
        this.vy = -32;
      } else {
        this.speed = 0;
      }
      // horizonatl
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;
      //vertical movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
        // navigate sprite sheet
        // jumping frame
        this.frameY = 1;
      } else {
        this.vy = 0;
        // back on ground reset frame to 0
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }
  // endlessly scrolling background -one endlessly scrolling layer
  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      // 2400 x 700
      this.image = document.getElementById("backgroundImage");
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      // speed of background scrolling
      this.speed = 7;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      // trick to prevent gap when end of image is reached
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      // scroll to the left
      this.x -= this.speed;
      // reset check
      if (this.x < 0 - this.width) this.x = 0;
    }
  }
  // generate enemies
  class Enemy {
    constructor(gameWidth, gameHeight) {
      // enemies need to be aware of game area boundaries
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 160;
      this.height = 119;
      this.image = document.getElementById("enemyImage");
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
    }
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
    update() {
      // move enemy to the left
      this.x--;
    }
  }
  // responsible for adding animated and removing enemies from the game
  // push instantiate of enemy to array
  // enemies.push(new Enemy(canvas.width, canvas.height));

  function handleEnemies(deltaTime) {
    // every increment of deltaTime push a new enemy to the array
    if (enemyTimer > enemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    // from the array
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update();
    });
  }
  // handles displaying score and other text
  function displayStatusText() {}
  // instantiate classes so its code will be executed
  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  //use time stamp and delta time to game timing
  lastTime = 0;
  // will trigger something at an interval and then set itself back to 0
  let enemyTimer = 0;
  // ms time limit - one second
  let enemyInterval = 1000;

  // animation loop - will run 60 times per second
  // pass in timeStamp
  function animate(timeStamp) {
    // animate has timeStamp argument on it automatically and can be passed to the function it calls
    const deltaTime = timeStamp - lastTime;
    // now set timeStamp to last time so it can be used in next loop as value from the previous loop
    lastTime = timeStamp;
    // console.log(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // just one layer to game so draw backgound firs to dog is on top
    background.draw(ctx);
    // background.update();
    player.draw(ctx);
    player.update(input);
    // make deltaTime avalable to handleenemies
    handleEnemies(deltaTime);
    requestAnimationFrame(animate);
  }
  // pass in 0 so that the first time that animate runs timeStamp dosent come back undefined
  animate(0);
  //
});
