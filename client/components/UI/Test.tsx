import EditorJS from '@editorjs/editorjs';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg'), {
    ssr: false,
});

const Test: React.FC = () => {
    // let
    // let editorRef = useRef<HTMLDivElement | null>(null);

    // const init = async () => {
    //     // const lib = await import('react-draft-wysiwyg');
    //     // const { Editor } = await import('react-draft-wysiwyg');
    //     editorRef.current = (
    //         <Editor
    //             // editorState={editorState}
    //             toolbarClassName='toolbarClassName'
    //             wrapperClassName='wrapperClassName'
    //             editorClassName='editorClassName'
    //             // onEditorStateChange={this.onEditorStateChange}
    //         />
    //     );
    // };

    // init();

    return (
        <Editor
            // editorState={editorState}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            // onEditorStateChange={this.onEditorStateChange}
        />
    );
    // return <Box>{Editor}</Box>;
    // return <Box>{editorRef.current}</Box>;
};

export default Test;
