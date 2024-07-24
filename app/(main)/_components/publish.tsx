'use client';
import { useState } from 'react';

// convex library
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';

// hooks
import { useOrigin } from '@/hooks/use-origin';

// 3rd party: shadcn, sonner, lucide icon
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, Copy, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface PublishProps {
	initialData: Doc<'documents'>;
}

export const Publish = ({ initialData }: PublishProps) => {
	const origin = useOrigin(); // takes the domain name or url
	const update = useMutation(api.documents.updateDocument);

	// loading states
	const [copied, setCopied] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// guest preview url
	const url = `${origin}/preview/${initialData._id}`;

	const onPublish = () => {
		setIsSubmitting(true);

		const promise = update({
			id: initialData._id,
			isPublished: true,
		}) //
			.finally(() => setIsSubmitting(false));

		toast.promise(promise, {
			loading: 'Publishing...',
			success: 'Note has been published.',
			error: 'Failed to publish note!',
		});
	};

	const onUnpublish = () => {
		setIsSubmitting(true);

		const promise = update({
			id: initialData._id,
			isPublished: false,
		}) //
			.finally(() => setIsSubmitting(false));

		toast.promise(promise, {
			loading: 'Unpublishing...',
			success: 'Note has been unpublished',
			error: 'Failed to unpublished note!',
		});
	};

	const onCopy = () => {
		// copy the url
		navigator.clipboard.writeText(url);
		setCopied(true);

		// delay 1 sec to setCopied true
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};
	return (
		<Popover>
			{/* Modal trigger button */}
			<PopoverTrigger asChild>
				<Button size="sm" variant="ghost">
					Publish
					{initialData.isPublished && <Globe className="text-sky-500 w-4 h-4 ml-2" />}
				</Button>
			</PopoverTrigger>

			{/* Modal to publish and unpublish */}
			<PopoverContent //
				className="w-72"
				align="end"
				alignOffset={8}
				forceMount
			>
				{initialData.isPublished ? (
					<div className="space-y-4">
						{/* header published */}
						<div className="flex items-center gap-x-2">
							<Globe className="h-4 w-4 text-sky-500 animate-pulse" />
							<p className="text-xs font-medium text-sky-500">This is live on web.</p>
						</div>
						{/* copy url */}
						<div className="flex items-center">
							<input
								className="flex-1 py-4 px-2 text-xs border rounded-l-md h-8 bg-muted-foreground truncate"
								value={url}
								disabled
							/>
							<Button onClick={onCopy} disabled={copied} className="h-8 rounded-l-none">
								{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
							</Button>
						</div>

						<Button //
							size="sm"
							className="w-full text-xs"
							disabled={isSubmitting}
							onClick={onUnpublish}
						>
							Unpublish
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center">
						{/* header unpublished */}
						<Globe className="h-8 w-8 text-muted-foreground mb-2" />
						<p className="text-sm font-medium mb-2">Publish this note.</p>
						<span className="text-xs text-muted-foreground mb-4">Share your work with others.</span>
						<Button //
							disabled={isSubmitting}
							onClick={onPublish}
							className="w-full text-xs"
							size="sm"
						>
							Publish
						</Button>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};
