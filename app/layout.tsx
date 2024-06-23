import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Shadcn UI Theme Provider
import { ThemeProvider } from '@/components/providers/theme-provider';

// Convex Provider
import { ConvexClientProvider } from '@/components/providers/convex-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Note Keeper',
	description: 'This is a private note keeping application for personal use.',
	icons: {
		icon: [
			// Light mode Logo
			{
				media: '(prefers-color-scheme: light)',
				url: '/note-icon.png',
				href: '/note-icon.png',
			},

			// Dark mode Logo
			{
				media: '(prefers-color-scheme: dark)',
				url: '/note-icon.png',
				href: '/note-icon.png',
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ConvexClientProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
						storageKey="jotion-theme"
					>
						{children}
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
