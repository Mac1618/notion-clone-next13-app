'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Convex Library
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

// Clerk Librery
import { useUser } from '@clerk/clerk-react';

// Shadcn UI component
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from './ui/command';

// Hooks
import { useSearch } from '@/hooks/use-search';
import { File } from 'lucide-react';

export const SearchCommand = () => {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	// clerk && convex
	const { user } = useUser();
	const documents = useQuery(api.documents.getSearch);

	// zustand desturing useSearch
	const { isOpen, onClose, onOpen, onToggle } = useSearch((state) => ({
		isOpen: state.isOpen,
		onClose: state.onClose,
		onOpen: state.onOpen,
		onToggle: state.onToggle,
	}));

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			// shortcut key: k + ctrl or cmd
			// usable both for windows and macbook
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				onToggle();
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [onToggle]);

	const onSelect = (id: string) => {
		router.push(`/documents/${id}`);
		onClose();
	};

	// Prevent hydration error from dialogs
	// Dialogs don't exist in back end but exist in front-end
	if (!isMounted) {
		return null;
	}

	return (
		<CommandDialog //
			open={isOpen}
			onOpenChange={onClose}
		>
			<CommandInput //
				placeholder={`Search ${user?.fullName || user?.username}'s Note Keeper`}
			/>
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Documents">
					{documents?.map((doc) => (
						<CommandItem
							key={doc._id}
							value={`${doc._id}-${doc.title}`}
							title={doc.title}
							onSelect={onSelect}
						>
							{/* default icon and custom icon */}
							{doc.icon ? (
								<p className="mr-2 text-[18px]">{doc.icon}</p>
							) : (
								<File className="mr-2 w-4 h-4" />
							)}
							<span>{doc.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
};
