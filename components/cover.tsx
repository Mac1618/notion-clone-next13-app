'use client';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import Image from 'next/image';

import { ImageIcon, X } from 'lucide-react';
import { Button } from './ui/button';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';

interface CoverProps {
	url?: string;
	preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
	const params = useParams();
	const { isOpen, onClose, onOpen } = useCoverImage((state) => ({
		isOpen: state.isOpen,
		onOpen: state.onOpen,
		onClose: state.onClose,
	}));

	const removeCoverImage = useMutation(api.documents.removeCoverImage);

	const onRemoveCoverImage = () => {
		removeCoverImage({
			id: params.documentId as Id<'documents'>,
		});
	};

	return (
		<div
			className={cn(
				'relative w-full h-[35vh] group', //
				!url && 'h-[12vh]',
				url && 'bg-muted'
			)}
		>
			{/* !! = converts the value to boolean */}
			{!!url && <Image src={url} fill alt="Cover image" className="object-cover" />}
			{url && !preview && (
				<div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
					<Button
						onClick={onOpen}
						className="text-muted-foreground text-xs"
						variant="outline"
						size="sm"
					>
						<ImageIcon className="w-4 h-4 mr-2" />
						Change cover
					</Button>
					<Button
						onClick={onRemoveCoverImage}
						className="text-muted-foreground text-xs"
						variant="outline"
						size="sm"
					>
						<X className="w-4 h-4 mr-2" />
						Remove
					</Button>
				</div>
			)}
		</div>
	);
};
