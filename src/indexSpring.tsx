import * as React from 'react';
import { useRef, useState } from 'react';
import { animated, useSpring, useEffect } from 'react-spring';
import { Circle, CircleObj } from './Circle';
import { useClickListener } from './hooks';

export function App(props) {
	let circle1 = new CircleObj(100, 180, 50);
	circle1.fill = '#567';
	const inputEl = useRef(null);
	const eventListener = ({ clientX, clientY }) => {
		// circle1.cx = clientX;
	};
	useClickListener(inputEl, eventListener);
	// console.log(props.children);
	const props2 = useSpring({ cx: 300, r: 100, from: { cx: 0, r: 30 } });

	console.log('render');
	return (
		<div id="thediv" style={{ padding: 0 }}>
			<svg width="800" height="400" fill="#688" ref={inputEl}>
				<Circle circleObj={circle1} />

				<animated.circle
					// style={props2}
					// transform={`translate(${cx} ${cy})`}
					cx={props2.cx}
					cy={20}
					r={props2.r}
					// fill={fill}
					onClick={() => console.log('aa')}
				/>
			</svg>

			<button onClick={() => {}}>cools nixwe hmm</button>
		</div>
	);
}
