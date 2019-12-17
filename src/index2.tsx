import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { duration } from './rxjs-web-animation';
import { tween } from './rxjs-web-animation';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
import { easeInSine } from './rxjs-web-animation';
import { CircleObj, Circle } from './Circle';
import { useClickListener } from './hooks';

/* function DemoAnim(props) {
	const props2 = useSpring({ opacity: 1, from: { opacity: 0 } });
	return <animated.div style={props2}>I will fade in</animated.div>;
}
function SvgDemo() {
	const props = useSpring({ x: 100, from: { x: 0 } });
	return (
		<animated.svg strokeDashoffset={props.x}>
			<path d="..." />
		</animated.svg>
	);
} */

class DemoCool {
	nice = 'great';
	AppDemo = props => {
		return <div>hell {this.nice}</div>;
	};
}

function MainSvg(props) {
	let circle1 = new CircleObj(100, 180, 50);
	circle1.fill = '#567';
	const inputEl = useRef(null);
	// console.log(props.children);
	const eventListener = ({ clientX, clientY }) => {
		circle1.cx = clientX;

		circle1.cy = clientY;
	};
	/* 	let counter = 0;
	// update()
	function update() {
		if (counter > 1000) {
			{
				return;
			}
		}
		circle1.cx += 0.5;
		requestAnimationFrame(update);
		counter++;
	} */
	/* let counterx = 0;
	duration(500).subscribe({
		next: v => {
			counterx++;
			circle1.cx += 6;
			// console.log(`observerA: ${v}`)
		},
		complete: () => console.log('done counterx', counterx, circle1.cx)
	}); */
	tween({
		start: 20,
		end: 500,
		duration: 1000,
		easing: easeInSine
	}).subscribe({
		next: v => {
			// console.log(v);
			circle1.cx = v;
		},
		complete: () => console.log('done ye')
	});
	useClickListener(inputEl, eventListener);
	let demoCool = new DemoCool();

	return (
		<div id="thediv" style={{ padding: 0 }}>
			<svg width="800" height="400" fill="#688" ref={inputEl}>
				<Circle circleObj={circle1} />
			</svg>
			<demoCool.AppDemo />
			{/*    <SvgDemo />
      <DemoAnim /> */}
			<button
				onClick={() => {
					var t = d3
						.transition()
						.duration(750)
						.ease(d3.easePolyIn);
					console.log(d3.selectAll('circle'));
					d3.selectAll('circle')
						.transition(t)
						.style('fill', 'red')
						.attr('cx', 500);
				}}>
				cools nixwe hmm
			</button>
		</div>
	);
}

// you want this to be an object
// and a component
/* const Circle = observer(props => {
	// console.log('observer');
	let { cx, cy, r, fill } = props.circleObj;
	return (
		<circle
			// transform={`translate(${cx} ${cy})`}
			cx={cx}
			cy={cy}
			r={r}
			fill={fill}
			onClick={() => console.log('aa')}
		/>
	);
});

class CircleObj {
	@observable cx = 0;
	@observable cy = 0;
	@observable r = 0;
	@observable fill;
	constructor(cx, cy, r) {
		this.cx = cx;
		this.cy = cy;
		this.r = r;
	}
} */

// function useClickListener(inputEl, eventListener) {
// 	// we should pass inputEl
// 	// not inputEl.current
// 	// useEffect will run after render...
// 	// by that time current will have a value
// 	useEffect(() => {
// 		console.log('useEffect');
// 		let element = inputEl.current;
// 		// let element = document;
// 		let eventName = 'click';

// 		const isSupported = element && element.addEventListener;
// 		if (!isSupported) return;
// 		// const eventListener = ({ clientX, clientY }) => {
// 		// 	circle1.cx = clientX;
// 		// 	circle1.cy = clientY;
// 		// };
// 		element.addEventListener('click', eventListener);
// 		return () => {
// 			element.removeEventListener(eventName, eventListener);
// 		};
// 		// useEventListener("mousemove", handler, inputEl.current);
// 	});
// }

function App() {
	// duration(2000).subscribe({
	//   next: v => console.log(`observerA: ${v}`),
	//   complete: () => console.log('done')
	// })

	let circle1 = new CircleObj(100, 180, 50);
	circle1.fill = '#567';

	return (
		// <Container>

		// padding affects mouse location on svg
		// <div id="thediv" style={{ padding: 0 }}>
		<MainSvg>
			{/* {circles.map((x, i) => {
            return <Circle key={i} circleObj={x} />;
          })} */}
			{/* cx={x.cx} cy={x.cy} r={x.r}  */}
			{/* <Circle cx={100} cy={180} r={5} />
        <Circle cx={200} cy={180} r={5} /> */}
		</MainSvg>

		// </div>
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
	// <Hello compiler="TypeScript" framework="React" />,
	// document.getElementById("root")
);
