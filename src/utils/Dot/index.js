import Spring from '../Spring';
import Vector from '../Vector';

export default class Dot extends Spring {
  constructor(position = { x: 0, y: 0 }, size = 100, data) {
    super(position, size, { damp: 0.5, mass: 5.0, k: 0.5 }) 

    this.data = data;
    this.dist = 1000;
  }
  update(mouse) {
    const vec = Vector.create(mouse.x - this.pos.x, mouse.y -  this.pos.y)
    const dist = vec.length();
    this.dist = dist;

    if (dist < 3) return; // If mouse is within 3 of center dont move dot
    
    // Update spring
    super.update();

    if (dist < this.size / 2 + 100) {
      this.pos = Vector.create(this.pos.x, this.pos.y)
        .subtract(vec.unit().multiply(10 * -1/dist))
    }
    if (this.targetSize && Math.abs(this.targetSize - this.size) > 2) {
      this.size += (this.targetSize - this.size) / 2
    }
  }
  changeSize(to) {
    this.targetSize = to;
  }
  display(context, active) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
    context.lineWidth = .1;
    context.strokeStyle = active ? 'white' : 'black';
    context.stroke();   
    context.fillStyle = active ? 'white' : 'black';
    context.fill()
    context.closePath();   
  }
}