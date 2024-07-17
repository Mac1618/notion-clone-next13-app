'use client';
import { useEffect, useState } from 'react';

// Reusable component modals
import { SettingsModal } from './settings-modal';

export const ModalProvider = () => {
	const [mounted, isMounted] = useState(false);

	useEffect(() => {
		isMounted(true);
	}, []);

	// For hydration error
	if (!mounted) {
		return null;
	}

	return (
		<>
			<SettingsModal />
		</>
	);
};
