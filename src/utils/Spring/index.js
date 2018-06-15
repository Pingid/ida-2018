export default class Spring {
  constructor(pos, size, { mass, damp, k }) {
    this.anchor = Object.assign({}, pos);
    this.pos = Object.assign({}, pos);;
    this.size = size;

    this.spring = { mass, damp, k }
    this.move = { velx: 0, vely: 0, accel: 0, force: 0 }
  }
  update() {
    const { mass, damp, k } = this.spring;

    let force = -k * (this.pos.y - this.anchor.y);  
    let accel = force / mass;
    let vely = damp * (this.move.vely + accel);

    force = -k * (this.pos.x - this.anchor.x);
    accel = force / mass;
    let velx = damp * (this.move.velx + accel);

    this.move = { force, accel, vely, velx };
    this.pos = { x: this.pos.x + velx, y: this.pos.y + vely };
  }
}