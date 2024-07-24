'use client';
import { useTheme } from 'next-themes';

// Edgestore Library
import { useEdgeStore } from '@/lib/edgestore';

// blocknote react
import { useCreateBlockNote } from '@blocknote/react';

// blocknote core
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';

// blocknote mantine
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const { resolvedTheme } = useTheme();
	const { edgestore } = useEdgeStore();

	// save image in edege store
	const handleUpload = async (file: File) => {
		const response = await edgestore.publicFiles.upload({
			file,
		});

		// return image url for blocknote
		return response.url;
	};

	// block note editor
	const editor: BlockNoteEditor = useCreateBlockNote({
		initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
		uploadFile: handleUpload,
	});

	return (
		<div className="">
			<BlockNoteView
				editor={editor}
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
				editable={editable}
				onChange={() => {
					onChange(JSON.stringify(editor.document, null, 2));
				}}
			/>
		</div>
	);
};

export default Editor;
