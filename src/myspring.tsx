import * as React from 'react';
import { duration } from './rxjs-web-animation';
import { CircleObj, Circle } from './Circle';

class MySpring {
	vel = 0;
	pos = 0;
	drag;
	force;
	strength;

	constructor(drag = 0.99, strength = 0.0005) {
		this.drag = drag;
		this.strength = strength;
	}

	//if we assume t as target distance
	spring(t) {
		// if (this.pos == 0) {
		// 	this.pos = t;
		// }

		// then the displacedment is
		// the longer the higher the force
		let stretch = 1 - this.pos;
		// drag and force only serves to weaken it
		// strength is like the k constanbt

		// drag is optional you can use 1

		// the reason it is negative is that
		// we are moving from bob to origin...
		// in our example we are moving towards the
		// click position

		this.force = stretch * this.strength;

		// console.log('force', force);
		// drag is like damping
		// in the real world thgee is always some friction or drag
		this.vel *= this.drag;
		// applying the spring force o velocity
		this.vel = this.vel + this.force;
		if (this.vel < 0.0001) {
			// console.log('stop')
		}
		// console.log('this.vel', this.vel);
		this.pos = this.pos + this.vel;

		// print('pos $pos');
		return this.pos;
	}
}

export function App(props) {
	let circle1 = new CircleObj(100, 180, 50);
	circle1.fill = 'orange';
	circle1.opacity = 1;
	let msyp = new MySpring(0.4, 0.04);
	// let msyp = new MySpring(0.9, 0.03);

	let dur = duration(3000);
	// let dur = duration(3000);
	let cxorig = circle1.cx;

	dur.subscribe({
		next: d => {
			// console.log(d);
			// console.log(msyp.spring(d));
			// if (msyp.vel !== 0 && Math.abs(msyp.vel) < 0.00001) {
			// 	console.log('stop', msyp.force);
			// }

			if (Math.abs(msyp.force) < 0.00001 && Math.abs(msyp.vel) < 0.00001) {
				console.log('force', msyp.force);
			}
			circle1.cx = cxorig + msyp.spring(d) * 600;
		},
		complete: () => {
			console.log('done', circle1.cx);
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
