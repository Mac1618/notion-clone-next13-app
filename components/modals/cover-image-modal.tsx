'use client';
import { useParams } from 'next/navigation';

// COMPONENTS: shadcn UI
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { SingleImageDropzone } from '../single-image-dropzone';

// Hooks-
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

// convex Library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';

export const CoverImageModal = () => {
	const params = useParams();
	const [file, setFile] = useState<File>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// convex api
	const update = useMutation(api.documents.updateDocument);

	// Hooks
	const { edgestore } = useEdgeStore();
	const { isOpen, onOpen, onClose } = useCoverImage((state) => ({
		isOpen: state.isOpen,
		onOpen: state.onOpen,
		onClose: state.onClose,
	}));

	const handleOnClose = () => {
		setFile(undefined);
		setIsSubmitting(false);
		onClose();
	};

	const handleOnChange = async (file?: File) => {
		if (file) {
			setIsSubmitting(true);
			setFile(file);

			// Upload the file in edge store
			const res = await edgestore.publicFiles.upload({
				file,
			});

			// update the document coverImage url
			await update({
				id: params.documentId as Id<'documents'>,
				coverImage: res.url,
			});

			// reset
			handleOnClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-center text-lg font-semibold">Cover Image</h2>
				</DialogHeader>

				<SingleImageDropzone
					className="w-full outline-none"
					disabled={isSubmitting}
					value={file}
					onChange={handleOnChange}
				/>
			</DialogContent>
		</Dialog>
	);
};
