// Marketing Components
import { Logo } from './logo';

// Shadcn UI Components
import { Button } from '@/components/ui/button';

export const Footer = () => {
	return (
		<div className="dark:bg-[#1F1F1F] flex items-center w-full p-6 bg-background z-50">
			<Logo />
			<div className="md:ml-auto w-full flex justify-between md:justify-end  items-center gap-x-2 text-muted-foreground">
				<Button variant="ghost" size="sm">
					Privacy Policy
				</Button>
				<Button variant="ghost" size="sm">
					Terms & Conditions
				</Button>
			</div>
		</div>
	);
};
