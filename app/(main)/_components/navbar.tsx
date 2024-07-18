'use client';
import { useParams } from 'next/navigation'

// Convex Library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

// Lucide Icons
import { MenuIcon } from 'lucide-react';

// (main) components
import { Title } from './title';

// props type
interface NavbarProps {
	isCollapsed: boolean;
	onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
	const params = useParams();

	// query documents by params documentId
	const document: any = useQuery(api.documents.getDocumentById, {
		documentId: params.documentId as Id<"documents">,
	});

	// Loading screen
	if (document === undefined) {
		return (
			<nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4'>
				<Title.Skeleton />
			</nav>
		);
	}

	// No document found
	if (!document) {
		return null;
	}

	return (
		<>
			<nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
				{isCollapsed && (
					<MenuIcon
						role="button"
						onClick={onResetWidth}
						className="w-6 h-6 text-muted-foreground"
					/>
				)}
				<div className="flex justify-between items-center w-full">
					<Title initialData={document}/>
				</div>
			</nav>
		</>
	);
};
