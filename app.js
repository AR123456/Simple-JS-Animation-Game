/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];
// move this into the enemy constructor
// const enemyImage = new Image();
// enemyImage.src = "./enemies/enemy1.png";
// using this simple way to slow down the flapping of the wings
// how fast the sheet is traversed
let gameFrame = 0;

// factory function to create ememys
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy1.png";
    //randomizing starting positions
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // size of one enemy in the row sheet is 1758/6
    this.spriteWidth = 293;
    this.spriteHeight = 133;
    // this needs to be relative to sprite size to maintain aspect ratio
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    // adding random speed between 2 and -2
    this.speed = Math.random() * 4 - 2;
    this.frame = 0;
    // needs to be in floor so it has no remainder in the modulous check
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  update() {
    // random speed
    this.x += this.speed;
    this.y += this.speed;
    // slow down the sprites flapping randomly
    if (gameFrame % this.flapSpeed === 0) {
      // cycle through the frames
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      // enemyImage,
      this.image,
      // start at 0 0
      // 0,
      // instead of 0 use position or frame on sprite sheet
      this.frame * this.spriteWidth,
      0,
      // travel one sprite
      this.spriteWidth,
      this.spriteHeight,
      // where to display the cropped out frame
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
  // every loop increments the speed of wings flapping
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
