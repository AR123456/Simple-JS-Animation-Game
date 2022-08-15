/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];

const enemyImage = new Image();
enemyImage.src = "./enemies/enemy1.png";

// factory function to create ememys
class Enemy {
  constructor() {
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
  }

  update() {
    // random speed
    this.x += this.speed;
    this.y += this.speed;
  }
  draw() {
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      enemyImage,
      // start at 0 0
      0,
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
  requestAnimationFrame(animate);
}
animate();
