'use client';

// Next Library
import { redirect } from 'next/navigation';

// Convex Library
import { useConvexAuth } from 'convex/react';

// Main Components
import { Navigation } from './_components/navigation';

// Reusable Component
import { Spinner } from '@/components/spinner';
import { SearchCommand } from '@/components/search-command';

// Layout Types
interface MainLayoutType {
	children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutType) => {
	// Desctructuring useConvexAuth
	const { isAuthenticated, isLoading } = useConvexAuth();

	// Loading Component before showing the children pages
	if (isLoading) {
		return (
			<div className="h-full flex justify-center items-center">
				<Spinner size="lg" />
			</div>
		);
	}

	// Redirect to home if not authenticated
	if (!isAuthenticated) {
		return redirect('/');
	}

	return (
		<div className="h-full flex dark:[#1F1F1F]">
			<Navigation />
			<main className="flex-1 h-full overflow-y-auto">
				<SearchCommand />
				{children}</main>
		</div>
	);
};

export default MainLayout;
