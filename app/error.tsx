'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../components/ui/button';

const Error = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center space-y-4">
			<Image //
				src="/nodata-light.svg"
				height="300"
				width="300"
				alt="Error"
				className="dark:hidden"
			/>
			<Image //
				src="/nodata-dark.svg"
				height="300"
				width="300"
				alt="Error"
				className="hidden dark:block"
			/>
			<h2>Something went wrong!</h2>
			<Button asChild>
				<Link href="/documents">Go back</Link>
			</Button>
		</div>
	);
};

export default Error;
