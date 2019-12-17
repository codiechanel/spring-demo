import { useEffect, useState } from 'react';
import { duration, distance } from 'src/anim-lib';
import { elasticOut } from '../eases';
export function useClickListener(inputEl, eventListener) {
	// we should pass inputEl
	// not inputEl.current
	// useEffect will run after render...
	// by that time current will have a value
	useEffect(() => {
		console.log('useEffect');
		let element = inputEl.current;
		// let element = document;
		let eventName = 'click';

		const isSupported = element && element.addEventListener;
		if (!isSupported) return;
		// const eventListener = ({ clientX, clientY }) => {
		// 	circle1.cx = clientX;
		// 	circle1.cy = clientY;
		// };
		element.addEventListener('click', eventListener);
		return () => {
			element.removeEventListener(eventName, eventListener);
		};
		// useEventListener("mousemove", handler, inputEl.current);
	});
}

export function computeValue(t, dist) {
	let distance$ = distance(dist);

	let x = elasticOut(t);
	x = distance$(x);
	return x;
}

export function useMySpring(obj) {
	let origValues = {};
	let { from, to } = obj;
	Object.keys(to).forEach(x => {
		origValues[x] = from[x];
	});
	const [prop, setProp] = useState(origValues);

	useEffect(() => {
		console.log('useEffect');

		let durationValue = 1000;

		let duration$ = duration(durationValue);
		// let distance$ = distance(distance1);
		// let elastic$ = elastic(2);

		let distances = {};

		Object.keys(to).forEach(x => {
			distances[x] = to[x] - from[x];
		});

		let subs = duration$.subscribe({
			next: frame => {
				// console.log('aa', computeValue(frame, distance1))
				let newObj = {};
				Object.keys(to).forEach(x => {
					newObj[x] = origValues[x] + computeValue(frame, distances[x]);

					// from[x] = origValues[x] + computeValue(frame, distances[x]);
				});
				setProp(newObj);
			},
			complete: () => {
				// make sure we get exact
				// obj[prop] = origVal + distance1;
				let newObj = {};
				Object.keys(to).forEach(x => {
					newObj[x] = origValues[x] + distances[x];

					// from[x] = origValues[x] + computeValue(frame, distances[x]);
				});
				setProp(newObj);
				console.log('Animated', 'completed');
			}
		});

		return () => subs.unsubscribe();
		// we want to run this only once
	}, []);

	return prop;
}
