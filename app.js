/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
// increasing this gives more enemies
const numberOfEnemies = 10;
const enemiesArray = [];
// how fast the sheet is traversed
let gameFrame = 0;

// factory function to create ememies
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy2.png";
    //each bat gets a random speed
    this.speed = Math.random() * 4 + 5;
    // size of one enemy in the row sheet is 1596/6
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    // maintain aspect ratio
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    //randomizing starting positions and account for size of canvas
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  // movment - bats fly off page to the left never ending
  update() {
    // this.x += Math.random() * 5 - 2.5;
    // this bats fly off the page to the left
    this.x -= this.speed;
    // this.y += Math.random() * 5 - 2.5;
    // check for when the bats fly off page to the left then pull them back
    if (this.x + this.width < 0) this.x = canvas.width;
    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      // cycle through the frames
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
