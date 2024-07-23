'use client';
// Convex Library
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

// Reusable components
import { Cover } from '@/components/cover';
import { Toolbar } from '@/components/toolbar';

// params props type
interface DocumentIdPageProps {
	params: {
		documentId: Id<'documents'>;
	};
}

// Checks if the value is an instance of Error.
function isError(data: any): data is Error {
	return data instanceof Error;
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
	const document = useQuery(api.documents.getDocumentById, {
		documentId: params.documentId,
	});

	// Loading state
	if (document === undefined) {
		return <div> Loading...</div>;
	}

	// No document found or error
	if (document === null || isError(document)) {
		return <div>{document?.message || 'Not found.'}</div>;
	}

	return (
		<div className="pb-40">
			<Cover url={document.coverImage}  />
			<div className="md:max-w-3xl lg:max-w-4xl mx-auto">
				<Toolbar initialData={document} />
			</div>
		</div>
	);
};

export default DocumentIdPage;
