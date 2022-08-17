/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
// increasing this gives more enemies
const numberOfEnemies = 20;
const enemiesArray = [];
// how fast the sheet is traversed
let gameFrame = 0;

// factory function to create ememies
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy3.png";

    this.speed = Math.random() * 4 + 5;
    // size of one enemy in the row sheet is 1308/6
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    // maintain aspect ratio
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    //effects who fast angle value is increasing, increase horizantal movement
    // this affects how fast angle speed is increasing on this.y =
    this.angleSpeed = Math.random() * 2 + 0.5;
    //changing this to be a random number between 0 and 200
    // this determines the radious of the circle the characters are
    // moving in speed along the circular path
    this.curve = Math.random() * 200 + 50;
  }

  update() {
    ///// animate the horizontal x position /////
    // this.x -= this.speed;
    // want horizontal movement to be cycling within a certain range
    // pass math.sin this.angle. this.angle value is increasing over and
    //  as update is called inside animation loop then multiply it by
    // math.pi / 180  the whole thing by 100, then updated  (this.curve)

    // the + canvas.width/2 at the end is to keep them off the left edge of the canvas - this.width is to offset them by their width
    // changing the hard coded 100 to this.curve for
    this.x =
      this.curve * Math.sin((this.angle * Math.PI) / 180) +
      (canvas.width / 2 - this.width / 2);
    //// animmate the y positon vetical
    // this.y += this.curve * Math.sin(this.angle);
    // using the formula for x and changing hight to width
    // need to use cosin
    this.y =
      this.curve * Math.cos((this.angle * Math.PI) / 180) +
      (canvas.height / 2 - this.height / 2);
    this.angle += this.angleSpeed;
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
