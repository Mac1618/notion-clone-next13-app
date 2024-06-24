'use client';

// Next Library
import Image from 'next/image';

// React Library

// Shadcn UI Components
import { Button } from '@/components/ui/button';

// Lucide React Icons
import { PlusCircle } from 'lucide-react';

// Clerk Library
import { useUser } from '@clerk/clerk-react';

// Convex Library

const DocumentsPage = () => {
	// Destructuring 'useUser' grab the data from logged in users
	const { user } = useUser();

	console.log(user)

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-2">
			<Image
				src="/empty-light.svg" //
				className="dark:hidden"
				width={300}
				height={300}
				alt="image"
			/>
			<Image
				src="/empty-dark.svg"
				className="hidden dark:block"
				width={300}
				height={300}
				alt="image"
			/>

			<h2 className="text-lg font-medium">Welcome to {user?.username}&apos;s Note Keeper</h2>

			<Button>
				<PlusCircle className="w-4 h-4 mr-2" />
				Create a note
			</Button>
		</div>
	);
};

export default DocumentsPage;
