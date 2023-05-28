import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { EditorState } from 'react-draft-wysiwyg';

// dynamic() can only import react components
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((lib) => lib.Editor),
    {
        ssr: false,
    }
);

const Test: React.FC = () => {
    const [editorState, setEditorState] = useState<EditorState | undefined>(
        undefined
    );

    useEffect(() => {
        const initEditor = async () => {
            const emptyEditorState = (
                await import('draft-js')
            ).EditorState.createEmpty();
            setEditorState(emptyEditorState);
        };
        initEditor();
    }, []);

    return (
        <Box>
            <Editor
                editorState={editorState}
                toolbarClassName='toolbarClassName'
                wrapperClassName='wrapperClassName'
                editorClassName='editorClassName'
                onEditorStateChange={setEditorState}
            />
        </Box>
    );
};

export default Test;
