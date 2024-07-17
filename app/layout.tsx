import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Providers
import { ModalProvider } from '@/components/modals/modal-provider';
import { ConvexClientProvider } from '@/components/providers/convex-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

// Sonner Library
import { Toaster } from 'sonner';

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
						<Toaster position="bottom-center" />
						<ModalProvider />
						{children}
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
