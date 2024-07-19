'use client';
import { useRouter } from 'next/navigation';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';

//  COMPONENTS: Shadcn UI || Modals
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';

//  3rd PARTY: Sonner || Lucide
import { toast } from 'sonner';

// props types
interface BannerProps {
	documentId: Id<'documents'>;
}

export const Banner = ({ documentId }: BannerProps) => {
	const router = useRouter();
	const remove = useMutation(api.documents.removeDocument);
	const restore = useMutation(api.documents.restoreDocument);

	const onRemoveDocument = () => {
		const promise = remove({ id: documentId })

		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Note deleted!',
			error: 'Failed to delete note.',
		});

		return router.push('/documents');
	};

	const onRestoreDocument = () => {
		const promise = restore({ id: documentId });

		return toast.promise(promise, {
			loading: 'Restoring note...',
			success: 'Note restored!',
			error: 'Failed to restore note.',
		});
	};

	return (
		<div className="w-full bg-rose-500 text-center text-sm p-2 gap-x-2 text-white flex items-center justify-center">
			<p>This page is in the trash.</p>
			<Button
				size="sm"
				onClick={onRestoreDocument}
				variant="outline"
				className="border-white bg-transparent hover:bg-primary/5 text-white hover:bg-rose-300 p-1 px-2 h-auto font-normal"
			>
				Restore page
			</Button>

			<ConfirmModal onConfirm={onRemoveDocument}>
				<Button
					size="sm"
					variant="outline"
					className="border-white bg-transparent hover:bg-primary/5 text-white hover:bg-rose-300 p-1 px-2 h-auto font-normal"
				>
					Remove forever
				</Button>
			</ConfirmModal>
		</div>
	);
};
