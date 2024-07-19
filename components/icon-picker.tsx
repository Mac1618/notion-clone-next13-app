'use client';
import { useTheme } from 'next-themes';

// Components: Shadcn UI
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// 3RD PARTY: Emoji Picker
import EmojiPicker, { Theme } from 'emoji-picker-react';

// props types
interface IconPickerProps {
	onChange: (icon: string) => void;
	children: React.ReactNode;
	asChild?: boolean;
}

export const IconPicker = ({ onChange, children, asChild }: IconPickerProps) => {
	const { resolvedTheme } = useTheme();
	const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;

	const themeMap = {
		dark: Theme.DARK,
		light: Theme.LIGHT,
	};

	const theme = themeMap[currentTheme];

	return (
		<Popover>
			<PopoverTrigger //
				asChild={asChild}
			>
				{children}
			</PopoverTrigger>
			<PopoverContent //
				className="p-0 w-full border-none shadow-none"
			>
				<EmojiPicker //
					height={350}
					theme={theme}
					onEmojiClick={(data) => onChange(data.emoji)}
				/>
			</PopoverContent>
		</Popover>
	);
};
