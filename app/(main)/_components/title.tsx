'use client';
import { useRef, useState } from 'react';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// props type
interface TitleProps {
	initialData: Doc<'documents'>;
}

export const Title = ({ initialData }: TitleProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isEditing, setIsEditing] = useState(false);

	const [title, setTitle] = useState(initialData.title || 'Untitled');
	const update = useMutation(api.documents.updateDocument);

	const enableInput = () => {
		setTitle(initialData.title);
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
		}, 0);
	};

	const disableInput = () => {
		setIsEditing(false);
	};

	// 'Enter' button shortcut
	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			disableInput();
		}
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
		update({
			id: initialData._id,
			title: event.target.value || 'Untitled',
		});
	};

	return (
		<div className="flex items-center gap-x-1">
			{!!initialData && <p>{initialData?.icon}</p>}
			{isEditing ? (
				<Input //
					ref={inputRef}
					onClick={enableInput}
					onBlur={disableInput}
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={title}
					className="h-7 px-2 focus-visible:ring-transparent"
				/>
			) : (
				<Button //
					onClick={enableInput}
					variant="ghost"
					size="sm"
					className="font-normal h-auto p-1 "
				>
					<span>{initialData?.title}</span>
				</Button>
			)}
		</div>
	);
};

// Skeleton component for Title
Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className="h-5 w-20 rounded-md" />;
};
