import * as React from 'react';
export function App(props) {
	return <div>nice</div>;
}

class MySpring {
	vel = 0;
	pos = 0;
	drag;
	strength;

	spring(t) {
		if (this.pos == 0) {
			this.pos = t;
		}

		let force = 1 - this.pos;
		force = force * this.strength;
		this.vel *= this.drag;
		this.vel = this.vel + force;
		this.pos = this.pos + this.vel;

		// print('pos $pos');
		return this.pos;
	}
}
