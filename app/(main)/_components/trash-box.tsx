'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';

// Sonner Library
import { toast } from 'sonner';

// Shadcn UI components
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';

// Lucide Icons
import { SearchIcon, Trash, Undo } from 'lucide-react';

export const TrashBox = () => {
	const [search, setSearch] = useState('');

	// next router
	const router = useRouter();
	const params = useParams();

	// request api using convex
	const documents = useQuery(api.documents.getTrash);
	const restore = useMutation(api.documents.restoreDocument);
	const remove = useMutation(api.documents.removeDocument);

	const onClick = (documentId: string) => {
		return router.push(`/documents/${documentId}`);
	};

	// filter trash docs
	const filterTrashDocuments = documents?.filter((doc) => {
		return doc.title.toLowerCase().includes(search.toLowerCase());
	});

	// restore trash docs
	const onRestoreTrash = (
		// params
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		documentId: Id<'documents'>
	) => {
		event.stopPropagation();
		const promise = restore({ id: documentId });

		toast.promise(promise, {
			loading: 'Restoring note...',
			success: 'Note restored',
			error: 'Failed to restore note',
		});
	};

	// permanent delete trash doc
	const onRemoveTrash = (documentId: Id<'documents'>) => {
		const promise = remove({ id: documentId });

		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Note deleted',
			error: 'Failed to delete note',
		});

		// redirect user if document is deleted
		if (params.documentId === documentId) {
			router.push('/documents');
		}

		// Loading state
		if (documents === undefined) {
			return (
				<div className="w-full flex items-center justify-center p-4">
					<Spinner size="lg" />
				</div>
			);
		}
	};

	return (
		<div className="text-sm">
			{/* Search */}
			<div className="flex items-center gap-x-1 p-2">
				<SearchIcon className="w-4 h-4" />
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
					placeholder="Filtered by title..."
				/>
			</div>

			{/* Content */}
			<div className="mt-2 px-1 pb-1">
				<p className="hidden last:block text-sm text-center text-muted-foreground pb-2">
					No documents found!
				</p>
				{filterTrashDocuments?.map((trash, i) => (
					<div
						key={i}
						className="text-sm rounded-sm w-full hover:bg-primary/5 flex justify-between items-center text-primary"
					>
						<span className="truncate pl-2">{trash.title}</span>

						{/* content actions */}
						<div className="flex items-center">
							<div
								role="button"
								onClick={(e) => onRestoreTrash(e, trash._id)}
								className="rounded-sm p-2 hover:bg-neutral-200"
							>
								<Undo className="w-4 h-4 text-muted-foreground" />
							</div>

							{/* confirm modal */}
							<ConfirmModal onConfirm={() => onRemoveTrash(trash._id)}>
								<div role="button" className="rounded-sm p-2 hover:bg-neutral-200">
									<Trash className="h-4 w-4 text-muted-foreground" />
								</div>
							</ConfirmModal>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
