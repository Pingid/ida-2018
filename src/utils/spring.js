class Spring {
	constructor(pos, { mass, damp, k } = { damp: 0.05, mass: 2.0, k: 0.9 }) {
		this.anchor = Object.assign({}, pos);
		this.pos = Object.assign({}, pos);;

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
}

export default Spring