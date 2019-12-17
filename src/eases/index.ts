export const linear = t => {
	return t;
};

export const elasticOut = t => {
	return (
		Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0
	);
};
