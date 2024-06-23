// React Library
import { useEffect, useState } from 'react';

export const useScrollTop = (threshold = 10) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		// Check if the page is scrolling
		const handleScroll = () => {
			if (window.scrollY > threshold) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		// smooth logic scrolling
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [threshold]);

	// return the scrolled value 
	return scrolled;
};
