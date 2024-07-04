'use client';

// Lucide React Icons
import { ChevronDown, ChevronRight, LucideIcon, Plus } from 'lucide-react';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';

// Shadcn Library
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface ItemProps {
	// Opional props
	id?: Id<'documents'>;
	documentIcon?: string;
	level?: number;
	active?: boolean;
	isSearch?: boolean;
	expanded?: boolean;
	onExpand?: () => void;

	// Required props
	onClick: () => void;
	label: string;
	icon: LucideIcon;
}

export const Item = ({
	// paramaters
	id,
	onClick,
	label,
	icon: Icon,
	documentIcon,
	active,
	expanded,
	isSearch,
	level = 0,
	onExpand,
}: ItemProps) => {
	// Icons to use
	const ChevronIcon = expanded ? ChevronDown : ChevronRight;

	// Folder expansion
	const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		onExpand?.();
	};

	// Next Router
	const router = useRouter();

	// useMutation for creating new folder
	const create = useMutation(api.documents.create);

	// Create new folder
	const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		// If no id is found, break the function 
		if (!id) return;

		// function to creat new note
		const promise = create({ title: 'Untitled', parentDocument: id }).then(() => {
			// Check if not expanded then expand
			if (!expanded) {
				onExpand?.();
			}

			// Redirect the user
			// router.push(`/documents/${id}`);
		});

		// Notify
		return toast.promise(promise, {
			loading: 'Creating a new note...',
			success: 'Note created successfully!',
			error: 'Failed to create a new note!',
		});
	};

	return (
		<div
			onClick={onClick}
			role="button"
			style={{
				paddingLeft: level ? `${level * 12 + 12}px` : '12px',
			}}
			className={cn(
				'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground',
				active && 'text-primary bg-primary/5'
			)}
		>
			{!!id && (
				<div
					role="button"
					className="h-ful rounded-sm hover:bg-neutral-300 hover:dark:bg-neutral-600 mr-1"
					onClick={handleExpand}
				>
					<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
				</div>
			)}

			{/* Custome Icons */}
			{documentIcon ? (
				<div className="shrink-0 h-[18px] mr-2">{documentIcon}</div>
			) : (
				<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
			)}

			{/*  */}
			<span className="truncate">{label}</span>

			{/* Search Icon */}
			{isSearch && (
				<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded boarder bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">Ctrl + K</span>
				</kbd>
			)}
			{!!id && (
				<div className="ml-auto flex items-center gap-2">
					<div 
						role='button'
						onClick={onCreate}
						className="group-hover:opacity-100 opacity-0 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
						<Plus className="w-4 h-4 text-muted-foreground" />
					</div>
				</div>
			)}
		</div>
	);
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			style={{
				paddingLeft:
					// Ternary operator
					level ? `${level * 12 + 25}px` : '12px',
			}}
			className="flex gap-x-3 py-[3px]"
		>
			<Skeleton className="h-4 w-4" />
			<Skeleton className="h-4 w-[30%]" />
		</div>
	);
};
