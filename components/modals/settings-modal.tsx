'use client';

// Reusable components
import { ModeToggle } from '../mode-toggle';

// Custom hooks
import { useSettings } from '@/hooks/use-setting';

// Shadcn UI component
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { Label } from '../ui/label';

export const SettingsModal = () => {
	const settings = useSettings();

	return (
		<Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
			<DialogContent>
				<DialogHeader className="border-b pb-3">
					<h2 className="">My Settings</h2>
				</DialogHeader>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<Label>Apperance</Label>
						<span className="text-[0.8rem] text-muted-foreground">
							Customize how Note Keeper looks on your device
						</span>
					</div>
					<ModeToggle />
				</div>
			</DialogContent>
		</Dialog>
	);
};
