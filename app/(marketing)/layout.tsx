// Marketing Components
import { Navbar } from './_components/navbar';

// Childeren Type
interface MarketingLayoutType {
	children: React.ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutType) => {
	return (
		<div className="h-full dark:bg-[#1F1F1F]">
			{/* Navigation Bar */}
			<Navbar />

			{/* Marketing Section */}
			<main className="h-full pt-40 ">{children}</main>
		</div>
	);
};

export default MarketingLayout;
