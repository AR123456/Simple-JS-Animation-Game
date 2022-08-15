/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

// factory function to create ememys
// // starating with just one
// enemy1 = {
//   x: 10,
//   y: 50,
//   width: 200,
//   height: 200,
// };

class Enemy {
  constructor() {
    //starting coordinates
    // this.x = 10;
    // this.y = 50;
    // this.width = 100;
    // this.height = 100;
    //randomizing starting positions of emenys
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 100;
    this.height = 100;
  }
  // methods avalable to all enemys created using this class. It will update the coordiates of the objects
  update() {
    // for every frame increase x and y by one
    this.x++;
    this.y++;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
// call the class to generate an ememy
const enemy1 = new Enemy();
// creating an second
const enemy2 = new Enemy();

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // calling the update method defined in  in the constructor now
  enemy1.update();
  // enemy1.x++;
  // enemy1.y++;
  // enemy2.x += 0.5;
  // enemy2.y += 0.5;
  // now using the draw method defined in the class
  // ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
  enemy1.draw();

  requestAnimationFrame(animate);
}
animate();
