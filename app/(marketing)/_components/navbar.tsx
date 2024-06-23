'use client';

// Next Library
import Link from 'next/link';

// React Library
import { useScrollTop } from '@/hooks/use-scroll-top';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Convex Library
import { useConvexAuth } from 'convex/react';

// Clerk
import { SignInButton, UserButton } from '@clerk/clerk-react';

// Reusable Components
import { ModeToggle } from '@/components/mode-toggle';
import { Spinner } from '@/components/spinner';

// Marketing Components
import { Logo } from './logo';

export const Navbar = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const scrolled = useScrollTop();

	return (
		<div
			className={cn(
				'dark:bg-[#1F1F1F] z-50 bg-background fixed top-0 items-center flex w-full p-6',
				scrolled && 'border-b shadow-sm'
			)}
		>
			<Logo />
			<div className="w-full md:ml-auto flex justify-between md:justify-end  items-center gap-x-2">
				{/* Loading state */}
				{isLoading && <Spinner />}

				{/* No Logged in User */}
				{!isAuthenticated && !isLoading && (
					<>
						<SignInButton mode="modal">
							<Button variant="ghost" size="sm">
								Login
							</Button>
						</SignInButton>

						<SignInButton mode="modal">
							<Button size="sm">Get Note Keeper free</Button>
						</SignInButton>
					</>
				)}

				{/* User is logged in */}
				{isAuthenticated && !isLoading && (
					<>
						<Button variant="ghost" size="sm" asChild>
							<Link href="/documents">Enter Note Keeper</Link>
						</Button>
						<UserButton afterSignOutUrl='/'/>
					</>
				)}
				<ModeToggle />
			</div>
		</div>
	);
};
