// Next Library
import { Poppins } from 'next/font/google';
import Image from 'next/image';

// Shadcn UI Components
import { cn } from '@/lib/utils';

// google font variable
const font = Poppins({
	subsets: ['latin'],
	weight: ['400', '600'],
});

// Reusable Icon for Marketing page
export const Logo = () => {
	return (
		<div className="hidden md:flex items-center gap-x-2">
			<Image src="/note-icon.png" height={40} width={40} alt="Logo" />
			<p className={cn('font-semibold w-40', font.className)}>Note Keeper</p>
		</div>
	);
};
