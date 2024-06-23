'use client';

// Next Library
import Link from 'next/link';

// Convex Library
import { useConvexAuth } from 'convex/react';

// Clerk Library
import { SignInButton } from '@clerk/clerk-react';

// Shadcn UI Components
import { Button } from '@/components/ui/button';

// Reusable Components
import { Spinner } from '@/components/spinner';

// Lucide React Icons
import { ArrowRight } from 'lucide-react';

export const Heading = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<div className="max-w-3xl space-y-4">
			<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
				Your Ideas, Documents, & Plans, Unified, Welcome to{' '}
				<span className="underline">Note Keeper</span>
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-medium">
				Note Keeper is the connected workspace where <br />
				better, faster work happens.
			</h3>

			{/* currently Loading */}
			{isLoading && (
				<div className="w-full flex items-center justify-center">
					<Spinner size="lg" />
				</div>
			)}

			{/* User is logged in and not loading */}
			{isAuthenticated && !isLoading && (
				<Link href="/documents">
					<Button>
						Enter Note Keeper
						<ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</Link>
			)}

			{/* Not loggedin and not loading */}
			{!isAuthenticated && !isLoading && (
				<SignInButton mode="modal">
					<Button>
						Enter Note Keeper
						<ArrowRight className="w-4 h-4 ml-2" />
					</Button>
				</SignInButton>
			)}
		</div>
	);
};
