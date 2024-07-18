'use client';

// Shadcn UI component
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';

// interface types
interface ConfirmModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
}

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
	const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		onConfirm();
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger //
				onClick={(e) => e.stopPropagation()}
				asChild
			>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				{/* content area */}
				<AlertDialogHeader>
					<AlertDialogTitle //
					>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription //
					>
						This action can&apos;t be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{/* action btns */}
				<AlertDialogFooter>
					<AlertDialogCancel //
						onClick={(e) => e.stopPropagation()}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction //
						onClick={handleConfirm}
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
