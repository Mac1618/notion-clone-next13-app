'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';

// Reusable components
import { Cover } from '@/components/cover';
import { Toolbar } from '@/components/toolbar';

// Shadcn components
import { Skeleton } from '@/components/ui/skeleton';

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
	// recommended way from to import from block note docs
	const Editor = useMemo(
		() =>
			//
			dynamic(
				() =>
					//
					import('@/components/Editor'),
				{ ssr: false }
			),
		[]
	);

	const document = useQuery(api.documents.getDocumentById, {
		documentId: params.documentId,
	});

	// use to save blocknote editor changes inside editor.tsx
	const update = useMutation(api.documents.updateDocument);
	const onChange = (content: string) => {
		update({
			id: params.documentId,
			content: content,
		});
	};

	// Loading state
	if (document === undefined) {
		return (
			<div>
				<Cover.Skeleton />
				<div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
					<div className="space-y-4 pl-8 pt-4">
						<Skeleton className="h-15 w-[50%]" />
						<Skeleton className="h-4 w-[80%]" />
						<Skeleton className="h-4 w-[40%]" />
						<Skeleton className="h-4 w-[60%]" />
					</div>
				</div>
			</div>
		);
	}

	// No document found or error
	if (document === null || isError(document)) {
		return <div>{document?.message || 'Not found.'}</div>;
	}

	return (
		<div className="pb-40">
			<Cover //
				preview
				url={document.coverImage}
			/>
			<div className="md:max-w-3xl lg:max-w-4xl mx-auto space-y-4">
				<Toolbar //
					preview
					initialData={document}
				/>
				<Editor //
					editable={false}
					initialContent={document.content}
				/>
			</div>
		</div>
	);
};

export default DocumentIdPage;
