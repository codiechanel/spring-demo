import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { duration } from './rxjs-web-animation';
import { tween } from './rxjs-web-animation';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
// import { useSpring, animated } from 'react-spring';
import { easeInSine } from './rxjs-web-animation';
import { CircleObj, Circle } from './Circle';
import { duration, distance } from './anim-lib';
import { elasticOut } from './eases';
import { map, takeWhile, tap } from 'rxjs/operators';
import { useClickListener, useMySpring, computeValue } from './hooks';
// this one will return a function
const elastic = (bounciness: number = 1) => {
	const p = bounciness * Math.PI;
	return t => 1 - Math.pow(Math.cos((t * Math.PI) / 2), 3) * Math.cos(t * p);
};

// const linear = t => {
// 	return t;
// };

// const elasticOut = t => {
// 	return (
// 		Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0
// 	);
// };

// function computeValue(t, dist) {
// 	let distance$ = distance(dist);

// 	let x = elasticOut(t);
// 	x = distance$(x);
// 	return x;
// }
// we could pass in a class
// no problem
function interpolateCool(from, to, durationValue = 1000) {
	// console.log(Object.keys(obj));
	let duration$ = duration(durationValue);
	// let distance$ = distance(distance1);
	// let elastic$ = elastic(2);
	let origValues = {};
	let distances = {};
	Object.keys(to).forEach(x => {
		origValues[x] = from[x];
	});
	Object.keys(to).forEach(x => {
		distances[x] = to[x] - from[x];
	});
	console.log(distances);
	duration$.subscribe({
		next: frame => {
			// console.log('aa', computeValue(frame, distance1))
			Object.keys(to).forEach(x => {
				from[x] = origValues[x] + computeValue(frame, distances[x]);
			});
		},
		complete: () => {
			// make sure we get exact
			// obj[prop] = origVal + distance1;
			console.log('Animated', 'completed');
		}
	});
}
// we could pass in a class
// no problem
function interpolate(duration1, distance1, obj, prop, origVal) {
	console.log(Object.keys(obj));
	let duration$ = duration(duration1);
	let distance$ = distance(distance1);
	let elastic$ = elastic(2);
	duration$
		/* 	.pipe(
			// map(elastic$),
			map(elasticOut),
			// map(linear),
			// map(distance$(distanceVal)),
			map(distance$),
			tap(
				frame => {
					// console.log(frame);
					obj[prop] = origVal + frame;
					// circle1.cx = frame;
				},
				err => console.log(` error:`, err),
				() => {
					// make sure we get exact
					obj[prop] = origVal + distance1;
					console.log('Animated', 'completed');
				}
			)
		) */
		.subscribe({
			next: frame => {
				// console.log('aa', computeValue(frame, distance1))
				obj[prop] = origVal + computeValue(frame, distance1);
			},
			complete: () => {
				// make sure we get exact
				obj[prop] = origVal + distance1;
				console.log('Animated', 'completed');
			}
		});
}
// could use from to syntax plus optional duration which default to 1000
function moveBall2(duration1, distance1, obj, prop, origVal) {
	let duration$ = duration(duration1);
	let distance$ = distance(distance1);
	let elastic$ = elastic(2);
	duration$
		.pipe(
			// map(elastic$),
			map(elasticOut),
			// map(linear),
			// map(distance$(distanceVal)),
			map(distance$),
			tap(
				frame => {
					// console.log(frame);
					obj[prop] = origVal + frame;
					// circle1.cx = frame;
				},
				err => console.log(` error:`, err),
				() => {
					// make sure we get exact
					obj[prop] = origVal + distance1;
					console.log('Animated', 'completed');
				}
			)
		)
		.subscribe();
}

// function useMySpring(obj) {
// 	let origValues = {};
// 	let { from, to } = obj;
// 	Object.keys(to).forEach(x => {
// 		origValues[x] = from[x];
// 	});
// 	const [prop, setProp] = useState(origValues);

// 	useEffect(() => {
// 		console.log('useEffect');

// 		let durationValue = 1000;

// 		let duration$ = duration(durationValue);
// 		// let distance$ = distance(distance1);
// 		// let elastic$ = elastic(2);

// 		let distances = {};

// 		Object.keys(to).forEach(x => {
// 			distances[x] = to[x] - from[x];
// 		});

// 		let subs = duration$.subscribe({
// 			next: frame => {
// 				// console.log('aa', computeValue(frame, distance1))
// 				let newObj = {};
// 				Object.keys(to).forEach(x => {
// 					newObj[x] = origValues[x] + computeValue(frame, distances[x]);

// 					// from[x] = origValues[x] + computeValue(frame, distances[x]);
// 				});
// 				setProp(newObj);
// 			},
// 			complete: () => {
// 				// make sure we get exact
// 				// obj[prop] = origVal + distance1;
// 				console.log('Animated', 'completed');
// 			}
// 		});

// 		return () => subs.unsubscribe();
// 		// we want to run this only once
// 	}, []);

// 	return prop;
// }

export function App(props) {
	let circle1 = new CircleObj(100, 180, 50);
	circle1.fill = 'orange';
	circle1.opacity = 1;
	// console.log(Object.keys(circle1));
	const inputEl = useRef(null);
	const eventListener = ({ clientX, clientY }) => {
		// circle1.cx = clientX;

		let xFrameTotal = 0;
		let xdist = clientX - circle1.cx;
		let origx = circle1.cx;
		let origY = circle1.cy;
		// console.log('xdist', xdist);
		//  we should call when its truly finished
		// otherwise we get crazy animations...
		// interpolate(1000, xdist, circle1, 'cx', origx);
		// interpolate(1000, clientY - circle1.cy, circle1, 'cy', origY);
		// interpolate(2000, 1, circle1, 'opacity', 0);
		circle1.opacity = 0;
		interpolateCool(circle1, { cx: clientX, cy: clientY, opacity: 1 }, 2000);

		// moveBall(2000,xdist , frame => {
		// 	// console.log(frame);
		// 	xFrameTotal += frame;
		// 	circle1.cx = origx + frame;
		// });
		// moveBall(2000, clientY - 	circle1.cy, frame => {
		// 	// console.log('hmm');
		// 	circle1.cy =  origY + frame;;
		// });

		// circle1.cy = clientY;
	};
	// useClickListener(inputEl, eventListener);

	let prop2 = useMySpring({
		from: circle1,
		to: { cx: 300, cy: 300, opacity: 1 }
	});

	circle1.cx = prop2['cx'];

	circle1.cy = prop2['cy'];
	// console.log('render', prop2);

	// console.log(props.children);

	return (
		<div id="thediv" style={{ padding: 0 }}>
			<div>{prop2['cx']}</div>
			<svg width="800" height="400" fill="#688" ref={inputEl}>
				<Circle circleObj={circle1} />
			</svg>

			<button onClick={() => {}}>cools nixwe hmm</button>
		</div>
	);
}
// ReactDOM.render(
// 	<App />,
// 	document.getElementById('root')
// 	// <Hello compiler="TypeScript" framework="React" />,
// 	// document.getElementById("root")
// );
