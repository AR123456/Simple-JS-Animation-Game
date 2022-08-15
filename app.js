/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];

// factory function to create ememys

class Enemy {
  constructor() {
    //randomizing starting positions
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 100;
    this.height = 100;
    // adding random speed between 2 and -2
    this.speed = Math.random() * 4 - 2;
  }
  // methods avalable to all enemys
  update() {
    // this.x++;
    // this.y++;
    // random speed
    this.x += this.speed;
    this.y += this.speed;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
// call the class to generate an ememy
// const enemy1 = new Enemy();
// Create new enemies
for (let i = 0; i < numberOfEnemies; i++) {
  // create new enemy and push to enemies array
  enemiesArray.push(new Enemy());
}
console.log(enemiesArray);
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // methods from constructor
  //get enemies from array and call the update and draw methond on each
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  requestAnimationFrame(animate);
}
animate();
