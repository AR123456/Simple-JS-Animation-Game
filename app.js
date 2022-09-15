/**@type {HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1300;
  canvas.height = 720;
  // enemies array
  let enemies = [];
  let score = 0;
  let gameOver = false;
  const fullScreenButton = document.getElementById("fullScreenButton");

  // event listeners, keyboard events, array of currently active keys
  class InputHandler {
    constructor() {
      this.keys = [];
      // starting vertical coordinate
      this.touchY = "";
      // avoid over senseing touches like short taps make sure they are at lease 30 px apart
      // making this longer causes action to happen only after a longer swipe this is in distance , pixels
      this.touchThreshold = 30;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        } else if (e.key === "Enter" && gameOver) restartGame();
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
        // implementing use of touch screen to play game
        window.addEventListener("touchstart", (e) => {
          this.touchY = e.changedTouches[0].pageY;
        });
        window.addEventListener("touchmove", (e) => {
          // compare starting coordiante to current coordinate to determine direction
          // helper var to hold starting palce
          const swipeDistance = e.changedTouches[0].pageY - this.touchY;
          // check swipe direction of up and swipe up not currently in the keys array
          if (
            swipeDistance < -this.touchThreshold &&
            this.keys.indexOf("swipe up") === -1
          )
            this.keys.push("swipe up");
          else if (
            swipeDistance > this.touchThreshold &&
            this.keys.indexOf("swipe down") === -1
          )
            // slice down will restart game
            this.keys.push("swipe down");

          if (gameOver) restartGame();
        });
        window.addEventListener("touchend", (e) => {
          // this will run whenever user stop touching browser window
          // // clean up and discard reset
          // using splice to find and remove swipe up from array
          this.keys.splice(this.keys.indexOf("swipe up"), 1);
          this.keys.splice(this.keys.indexOf("swipe down"), 1);
        });
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
      this.x = 100;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImage");
      this.frameX = 0;
      // 8 sprite in top row
      this.maxFrame = 8;
      this.fps = 20;
      // cont from 0 to fame interval over and over
      this.frameTimer = 0;
      // value we are counting towards- how long a single frame lasts
      this.frameInterval = 1000 / this.fps;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
    }
    // restarting game
    restart() {
      //x and y original value
      this.x = 100;
      this.y = this.gameHeight - this.height;
      // 8 sprite in top row
      this.maxFrame = 8;
      this.frameY = 0;
    }

    draw(context) {
      // hit box may not exactly match the sprite
      // should be predictable when collison can and cannot happen
      // this is drawn just as visual of what is going on in the actual hit detection but can use to adjust size visually and then in code
      context.lineWidth = 5;
      context.strokeStyle = "white";
      context.beginPath();
      context.arc(
        this.x + this.width / 2,
        // this.y + this.height / 2, adjust height of circle
        this.y + this.height / 2 + 20,
        // this.width / 2, - making circle smaller
        this.width / 3,
        0,
        Math.PI * 2
      );
      context.stroke();

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
    // update needs to expect enemies array as argument
    update(input, deltaTime, enemies) {
      enemies.forEach((enemy) => {
        // enemy hit box vs player hit box - center point of enemy vs player circle
        const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
        // const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2 + 20);
        // hypotenuse = distance
        const distance = Math.sqrt(dx * dx + dy * dy);
        // compare radi to the distance if = circles are touching and there is collison
        // if (distance < enemy.width / 2 + this.width / 2) {
        if (distance < enemy.width / 2 + this.width / 3) {
          gameOver = true;
        }
      });
      // traversing sprite sheet
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      // key controls
      // adding swipe controls
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (
        (input.keys.indexOf("ArrowUp") > -1 ||
          input.keys.indexOf("swipe up") > -1) &&
        this.onGround()
      ) {
        this.vy = -32;
      } else {
        this.speed = 0;
      }
      // horizontal
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;
      //vertical movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
        // navigate sprite sheet
        this.maxFrame = 5;
        // jumping frame
        this.frameY = 1;
      } else {
        this.vy = 0;
        // back on ground so max frame back to 8 using top row of sprite sheet
        this.maxFrame = 8;
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

    restart() {
      // this is mostly for visual feedback
      this.x = 0;
    }
  }
  // generate enemies
  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 160;
      this.height = 119;
      this.image = document.getElementById("enemyImage");
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.maxFrame = 5;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 8;
      this.markedForDeletion = false;
    }
    draw(context) {
      // hit box may not exactly match the sprite
      // should be predictable when collision can and cannot happen
      context.lineWidth = 5;
      context.strokeStyle = "white";
      context.beginPath();
      context.arc(
        // this.x + this.width / 2, testing out resizing of hit box before updating the code to detect collision
        this.x + this.width / 2 - 20,
        this.y + this.height / 2,
        // this.width / 2, testing out resizing of hit box before updating the code to detect collision
        this.width / 3,
        0,
        Math.PI * 2
      );
      context.stroke();
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

    // pass deltaTime to update and in forEach in enemy loop
    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;

        score++;
      }
    }
  }
  // responsible for adding animated and removing enemies from the game
  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));

      randomEnemyInterval = Math.random() * 1000 + 500;
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  }
  // handles displaying score and other text

  function displayStatusText(context) {
    context.textAlign = "left";
    context.fillStyle = "black ";
    context.font = "40px Helvetica";
    context.fillText("Score: " + score, 20, 50);
    context.fillStyle = "white ";
    context.font = "40px Helvetica";
    context.fillText("Score: " + score, 22, 52);
    if (gameOver) {
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText(
        "Game Over, try again! Press Enter or Swipe Down to Restart ",
        canvas.width / 2,
        200
      );
      context.textAlign = "center";
      context.fillStyle = "white";
      context.fillText(
        "Game Over, try again! Press Enter or Swipe Down to Restart ",
        canvas.width / 2 + 2,
        202
      );
    }
  }
  function restartGame() {
    // put player back in start postion - useing restart method on player
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  }

  function toggleFullScreen() {
    // returns null if full screen is not active
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      // canvas.requestFullscreen().then().catch();
      // returns promis, catch the error
      canvas.requestFullscreen().catch((err) => {
        alert(` Error, cannot enable full screen mode: ${err}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
  fullScreenButton.addEventListener("click", toggleFullScreen);
  // to exit full screen mode on mobile swipe down
  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);
  lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 1000;

  let randomEnemyInterval = Math.random() * 1000 + 500;

  // animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log(deltaTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    // putting collison detection check in player update method
    // pass in enemies array - check player vs enemies position each annimation frame
    player.update(input, deltaTime, enemies);
    handleEnemies(deltaTime);
    displayStatusText(ctx);
    if (!gameOver) requestAnimationFrame(animate);
  }

  animate(0);
  //
});
