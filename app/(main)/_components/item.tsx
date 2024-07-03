'use client';

// Lucide React Icons
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

// Convex Library
import { Id } from '@/convex/_generated/dataModel';

// Shadcn Library
import { cn } from '@/lib/utils';

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
					className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
					onClick={() => {}}
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
		</div>
	);
};
