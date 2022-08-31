/**@type {HTMLCanvasElement}*/

// main parent class -define properties and values shared between all enemy types
class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 200;
  }
  update() {}
  draw() {}
}
// extends keyword is used to create a so called child class or subclasses
// that defines specifics like diff visuals like movement pattern

// update
class Ghost extends Enemy {
  ///
  constructor() {
    // the super keyword The super keyword is used to call the constructor of its parent class to access the parent's properties and methods.
    super();
    this.image = "./ghost.png";
  }
}
const enemy1 = new Ghost();
// for each enemy type -when object instatiated and call update on it, if JS cannot find update method on the Ghost class it will go look for it automatically on the Enemy (parent class )
enemy1.update();
