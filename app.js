/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
// increasing this gives more enemies
const numberOfEnemies = 30;
const enemiesArray = [];
// how fast the sheet is traversed
let gameFrame = 0;

// factory function to create ememies
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy4.png";

    this.speed = Math.random() * 4 + 5;
    // size of one enemy in the row sheet is 1917/6
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    // maintain aspect ratio
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    // original position
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    //creating 2 new variables - new positions
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    // each character should update individually with randomized interval. Math.floor so modulus works
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    // every___frames  create new random position
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    // distance horizonatl axis
    let dx = this.x - this.newX;
    // distance vertical axis
    let dy = this.y - this.newY;
    // move character in direction of new postiion
    // new is moving to new by 70th of distance for eery animation frame
    this.x -= dx / 70;
    this.y -= dy / 70;

    // // animate the x
    // this.x = 0;
    // // animmate the y
    // this.y = 0;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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

// Create new enemies
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
// console.log(enemiesArray);
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
