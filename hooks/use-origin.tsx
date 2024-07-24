import { useEffect, useState } from 'react';

export const useOrigin = () => {
	// use because we will use windows.
	// windows can cause hydration error when it come to server side rendering.
	const [mouted, setMouted] = useState(false);
	const origin =
		// check if window is not undefine && 'window.location.origin' has value
		typeof window !== 'undefined' && window.location.origin
			? // use 'window.location.origin'
				window.location.origin
			: // return emplty string
				'';

	useEffect(() => {
		setMouted(true);
	}, []);

	if (!mouted) {
		return '';
	}

	return origin;
};
