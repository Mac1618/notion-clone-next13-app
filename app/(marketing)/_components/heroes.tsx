// Nextjs Library
import Image from 'next/image';

export const Heroes = () => {
	return (
		<div className="flex flex-col items-center justify-center max-w-5xl">
			<div className="flex items-center ">
				<div className="relative h-[400px] w-[400px] hidden md:block">
					<Image
						src="/reading-light.png"
						fill
						className="object-contain dark:hidden"
						alt="reading-image"
					/>
					<Image
						src="/reading-dark.png"
						fill
						className="object-contain hidden dark:block"
						alt="reading-image"
					/>
				</div>

				<div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
					<Image
						src="/document-light.png"
						fill
						className="object-contain dark:hidden"
						alt="document-image"
					/>
					<Image
						src="/document-dark.png"
						fill
						className="object-contain"
						alt="document-image hidden dark:block"
					/>
				</div>
			</div>
		</div>
	);
};
