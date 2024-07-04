'use client';

// Next and React Library
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Convex Library
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

// Shacn UI Library
import { cn } from '@/lib/utils';

// Main Component
import { FileIcon } from 'lucide-react';
import { Item } from './item';

// Props Types
interface DocumentListProps {
	parentDocumentId?: Id<'documents'>;
	level?: number;
	data?: Doc<'documents'>[];
}

export const DocumentList = ({
	parentDocumentId: parentDocumentId,
	level = 0,
}: DocumentListProps) => {
	//
	const params = useParams();
	const router = useRouter();
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const onExpand = (documentId: string) => {
		setExpanded((prevExpanded) => ({
			...prevExpanded,
			[documentId]: !prevExpanded[documentId],
		}));
	};

	// Query the getSidebar method
	const documents = useQuery(api.documents.getSidebar, {
		parentDocument: parentDocumentId,
	});

	// Redirect the user to this page
	const onRedirect = (documentId: string) => {
		router.push(`/documents/${documentId}`);
	};

	// Loading state for documents
	if (documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
					</>
				)}
			</>
		);
	}

	return (
		<>
			{/* If there are no Pages */}
			<p
				style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
				className={cn(
					'hidden text-sm font-medium text-muted-foreground',
					expanded && 'last:block',
					level === 0 && 'hidden'
				)}
			>
				No pages inside
			</p>

			{documents.map((doc: any) => (
				<div key={doc._id}>
					<Item
						id={doc._id}
						onClick={() => onRedirect(doc._id)}
						label={doc.title}
						icon={FileIcon}
						documentIcon={doc.icon}
						active={params.documentId === doc._id}
						level={level}
						onExpand={() => onExpand(doc._id)}
						expanded={expanded[doc._id]}
					/>

					{expanded[doc._id] && (
						<DocumentList //
							parentDocumentId={doc._id}
							level={level + 1}
						/>
					)}
				</div>
			))}
		</>
	);
};
