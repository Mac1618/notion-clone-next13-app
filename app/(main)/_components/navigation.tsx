'use client';

// Next Library
import { usePathname } from 'next/navigation';

// React Library
import { ElementRef, useEffect, useRef, useState } from 'react';

// Shadcn UI Library
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Convex Library
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';

// SOnner Library
import { toast } from 'sonner';

//  Lucide Icons
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react';

// Usehooks-ts Library
import { useMediaQuery } from 'usehooks-ts';

// Main Components
import { DocumentList } from './document-list';
import { Item } from './item';
import { TrashBox } from './trash-box';
import { UserItem } from './user-item';

export const Navigation = () => {
	// use to collapse the sidebar for mobile
	const pathname = usePathname();

	// Check if the screensize is mobile
	const isMobile = useMediaQuery('(max-width: 768px');

	// CONVEX: to query and create documents
	const createDocument = useMutation(api.documents.create);

	// Sidebar variables
	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ElementRef<'aside'>>(null);
	const navbarRef = useRef<ElementRef<'div'>>(null);
	const [isResetting, setIsResetting] = useState(false);
	const [isCollaped, setIsCollapsed] = useState(isMobile);

	// Collapse or reset the sidebar on mobile and desktop devices
	useEffect(() => {
		// if mobile mode collapse the sidebar
		if (isMobile) {
			collapseSidebar();

			// else reset to normal state the sidebar
		} else {
			resetSidebarWidth();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile]);

	// Collapse on mobile devices
	useEffect(() => {
		if (isMobile) {
			collapseSidebar();
		}
	}, [pathname, isMobile]);

	// Listen when the mousedown event is emitted or when the mouse is pressed down
	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault();
		event.stopPropagation();

		isResizingRef.current = true;
		// Used to resize the sidebar
		document.addEventListener('mousemove', handleMouseMove);
		// If the long press in mouse is removed the resizing stops
		document.addEventListener('mouseup', handleMouseUp);
	};

	// Listen for mousemove event and resize the sidebar
	const handleMouseMove = (event: MouseEvent) => {
		// Stop listening for mousemove events if not resizing the sidebar
		if (!isResizingRef.current) {
			return;
		}

		// variable of current width of sidebar
		let newWidth = event.clientX;

		// Minimum width of sidebar
		if (newWidth < 240) newWidth = 240;

		// Maximum width of sidebar
		if (newWidth > 480) newWidth = 480;

		// if sidebarRed and navbarRed are true, resize
		if (sidebarRef.current && navbarRef.current) {
			// save the current new size of sidebar and navbar
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty('left', `${newWidth}px`);
			navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
		}
	};

	// Stop listening for mousemove and mouseup events
	const handleMouseUp = () => {
		// change isResizingRef back to false or Resizing is done
		isResizingRef.current = false;

		// Stop the mousemove and mouseup events
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	// Reset the sidebar width to original state
	const resetSidebarWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			// to check if the reseting is done
			setIsResetting(true);

			// reset the sidebar
			sidebarRef.current.style.width = isMobile ? '100%' : '240px';
			// reset the border line right on the sidebar
			navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)');
			navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');

			// Time delay for animation of sidebar reseting size
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	// Collapsing the sidebar
	const collapseSidebar = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true); // Collapse the sidebar
			setIsResetting(true); // Reset is happening

			// reset the sidebar width to 0
			sidebarRef.current.style.width = '0';
			// reset the border line right on the sidebar
			navbarRef.current.style.setProperty('width', '100%');
			navbarRef.current.style.setProperty('left', '0');

			// Resetting is done and delay for 300 milliseconds for animation
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	// Creating new document inside the sidebar
	const handleCreateDocument = () => {
		// Creating new note to the database
		const promise = createDocument({ title: 'Untitled' });

		// Notify using sonner
		toast.promise(promise, {
			loading: 'Creating a new note...',
			success: 'Note created successfully',
			error: 'Failed to create note',
		});
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					'group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
					// closing sidebar animation
					isResetting && 'transition-all ease-in-out duration-300',
					// When in mobile mode don't show the sidebar
					isMobile && 'w-0'
				)}
			>
				{/* Close Button */}
				<div
					role="button"
					onClick={collapseSidebar}
					className={cn(
						'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
						// Closing button should always be visible in mobile mode
						isMobile && 'opacity-100'
					)}
				>
					<ChevronsLeft className="h-6 w-6" />
				</div>

				{/* User Information */}
				<div>
					<UserItem />
					<Item
						label="Search" //
						icon={Search}
						isSearch
						onClick={() => {}}
					/>

					<Item
						label="Settings" //
						icon={Settings}
						onClick={() => {}}
					/>

					<Item
						onClick={handleCreateDocument} //
						label="New page" //
						icon={PlusCircle}
					/>
				</div>

				{/* List of Notes */}
				<div className="mt-4">
					<DocumentList />
					<Item //
						onClick={handleCreateDocument}
						label="Add a page"
						icon={Plus}
					/>
					<Popover>
						<PopoverTrigger className="w-full mt-4">
							<Item label="Trash" icon={Trash} />
						</PopoverTrigger>
						<PopoverContent className="p-0 w-72" side={isMobile ? 'bottom' : 'right'}>
							<TrashBox />
						</PopoverContent>
					</Popover>
				</div>

				{/* Borderline when hovering in sidebar */}
				<div
					onMouseDown={handleMouseDown}
					onClick={resetSidebarWidth}
					className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
				></div>
			</aside>

			<div
				ref={navbarRef}
				className={cn(
					'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
					// closing sidebar animation
					isResetting && 'transition-all ease-in-out duration-300',
					// Resize the content based on sidebar if open or closed
					isMobile && 'left-0 w-full'
				)}
			>
				<nav className="bg-transparent px-3 py-2 w-full">
					{isCollaped && (
						<MenuIcon
							onClick={resetSidebarWidth}
							role="button"
							className="h-6 w-6 text-muted-foreground"
						/>
					)}
				</nav>
			</div>
		</>
	);
};
