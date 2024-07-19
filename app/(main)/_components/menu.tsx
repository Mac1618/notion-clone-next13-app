'use client';
import { useRouter } from 'next/navigation';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';

// Clerk Library
import { useUser } from '@clerk/clerk-react';

// COMPONENTS: Shadcn UI ||
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

// 3RD PARTY: Sonner || Lucide Icons
import { MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface MenuProps {
	documentId: Id<'documents'>;
}

export const Menu = ({ documentId }: MenuProps) => {
	const router = useRouter();
	const { user } = useUser();

	const archive = useMutation(api.documents.archive);

	const onArchive = () => {
		const promise = archive({ id: documentId });

		toast.promise(promise, {
			loading: 'Archiving note...',
			success: 'Note moved to trash!',
			error: 'Failed to archive the note.',
		});

		return router.push('/documents');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm" variant="ghost">
					<MoreHorizontal className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent //
				className="w-60"
				align="end"
				alignOffset={8}
				forceMount
			>
				<DropdownMenuItem onClick={onArchive}>
					<Trash className="h-4 w-4 mr-2" />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<div className="text-sm text-muted-foreground p-2">
					Last edited by: {user?.fullName || user?.username}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

// Skeleton component for Menu
Menu.Skeleton = function MenuSkeleton() {
	return <Skeleton className="h-6 w-6 rounded-md" />;
};
