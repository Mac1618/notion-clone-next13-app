'use client';

// Lucide React Icons
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

// Convex Library
import { Id } from '@/convex/_generated/dataModel';
import exp from 'constants';

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
			style={{ paddingLeft: '12px' }}
			className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground"
		>
			<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
			<span className="truncate">{label}</span>
		</div>
	);
};
