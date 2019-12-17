import * as React from 'react';
import { duration } from './rxjs-web-animation';
import { CircleObj, Circle } from './Circle';

class MySpring {
	vel = 0;
	pos = 0;
	drag = 0.99;
	strength = 0.005;

	constructor() {}

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

export function App(props) {
	let circle1 = new CircleObj(100, 180, 50);
	circle1.fill = 'orange';
	circle1.opacity = 1;
	let msyp = new MySpring();

	let dur = duration(5000);
	dur.subscribe({
		next: d => {
			console.log(d);
			console.log(msyp.spring(d));
			circle1.cx = msyp.spring(d) * 300;
		}
	});
	return (
		<div>
			nice
			<svg width="800" height="400" fill="#688">
				<Circle circleObj={circle1} />
			</svg>
		</div>
	);
}
