import { map, takeWhile, tap } from 'rxjs/operators';
import { animationFrameScheduler, defer, interval } from 'rxjs';

/**
 * there's no need to get the initial state
 * it would simply be retrieve from the
 * source div style
 */

export const msElapsed = (scheduler = animationFrameScheduler) =>
	defer(() => {
		const start = scheduler.now();
		/**
		 * we could simulate a slow motion by multiplying
		 * duration by x
		 * for example duration of 3000 will become 9000 ms
		 * we have 100 operations per sec for a zero interval
		 * 1000 / 100 = 10 ms / tick
		 * so 10 ms * 3 = 30 ms is our new interval
		 */
		return interval(0, scheduler).pipe(map(() => scheduler.now() - start));
	});

export const duration = (ms, scheduler = animationFrameScheduler) =>
	msElapsed(scheduler).pipe(
		map((ems: number) => ems / ms),
		takeWhile(t => t <= 1)
	);

export const distance = d => t => t * d;

export const pixelsPerSecond = v => ms => (v * ms) / 1000;
