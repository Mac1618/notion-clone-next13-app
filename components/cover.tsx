'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// components
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

// 3rd party
import { ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

// convex library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

// hooks
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from 'convex/react';

interface CoverProps {
	url?: string;
	preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
	const { edgestore } = useEdgeStore();
	const params = useParams();
	const coverImage = useCoverImage();

	const removeCoverImage = useMutation(api.documents.removeCoverImage);

	const onRemoveCoverImage = async () => {
		if (url) {
			await edgestore.publicFiles.delete({
				url: url,
			});
		}

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
						onClick={() => coverImage.onReplace(url)}
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

Cover.Skeleton = function CoverSkeleton() {
	return <Skeleton className="w-full h-[12vh]" />;
};
