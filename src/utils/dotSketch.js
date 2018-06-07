class Spring {
  constructor(pos, size, { mass, damp, k }) {
    this.anchor = Object.assign({}, pos);
    this.pos = Object.assign({}, pos);;
    this.size = size;

    this.spring = { mass, damp, k }
    this.move = { velx: 0, vely: 0, accel: 0, force: 0 }
  }
  update(p) {

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
  display(p) { 
    p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  } 
}

class Dot extends Spring {
  constructor(position = { x: 0, y: 0 }, size = 100, data) {
    super(position, size, { damp: 0.5, mass: 5.0, k: 0.5 }) 

    this.data = data;
    this.dist = 1000;
  }
  update(p) {
    const vec = p.createVector(p.mouseX - this.pos.x, p.mouseY -  this.pos.y)
    const dist = vec.mag();
    this.dist = dist;
    // if (dist < 5 && p.mouseIsPressed) { this.targetSize = 40; return;} 
    if (dist < 3) return; // If mouse is within 3 of center dont move dot
    
    // Update spring
    super.update(p);

    if (dist < this.size / 2 + 100) {
      this.pos = p.createVector(this.pos.x, this.pos.y)
        .sub(vec.normalize().mult(10 * -1/dist))
    }
    if (this.targetSize && Math.abs(this.targetSize - this.size) > 2) {
      this.size += (this.targetSize - this.size) / 2
    }
  }
  changeSize(to) {
    this.targetSize = to;
  }
  display(p) {
    p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}


const ringSize = 10;
let points = [];
let selected = null;
let cnv;
let mouseDown = false;
let clicked = false;

export default ({ width, height, marginX, marginY, p, color, select, lineDistanceLimmit }) => {
  p.setup = function () {
    console.log(p)
    cnv = p.createCanvas(width, height);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (points.length < 1 && props.projects.length > 2) {
      const xCoord = str => marginX / 2 + (width - marginX) * (parseInt(str.match(/(?<=\().*(?=,)/gi)[0]) + 100) / 200;
      const yCoord = str => marginY / 2 + (height - marginY) * (parseInt(str.match(/(?<=,).*(?=\))/gi)[0]) + 100) / 200;

      points = props.projects.map(p => 
        new Dot(
          {
            x: xCoord(p.mapCoOrdinates),
            y: yCoord(p.mapCoOrdinates)
          },
          ringSize,
          p
        )
      ); 
    }
  };

  p.draw = function () {
    p.clear()
    // p.background(p.color(255,255,255));
    p.strokeWeight(1)
    p.noFill()
    p.stroke(p.color(255,255,255))

    selected = null;

    points.forEach((ring1, i1) => {
      // Draw Lines
      points.forEach((ring2, i2) => {
        if ((ring1.pos.x === ring2.pos.x) && (ring1.pos.y === ring2.pos.y)) return;
        if (p.dist(ring1.pos.x, ring1.pos.y, ring2.pos.x, ring2.pos.y) < lineDistanceLimmit) {
          p.stroke(p.color('#EF652F'))
          p.stroke(p.color(255,255,255))
          p.strokeWeight(.2)
          p.line(ring1.pos.x, ring1.pos.y, ring2.pos.x, ring2.pos.y)
        }
      })
    })

    points.forEach((ring1) => {
      // Check if mouse is over any dots 
      if (ring1.dist < ringSize) {
        ring1.changeSize(1)
        selected = ring1.data.slug; 
      } else { ring1.changeSize(ringSize) }

      // Draw Dot
      p.stroke(p.color(255,255,255))
      p.strokeWeight(1)
      p.fill(p.color(color))
      ring1.update(p);
      ring1.display(p);
    })
    select(selected)
  };
}