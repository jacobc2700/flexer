import useData from '@/hooks/useData';
import useSendData from '@/hooks/useSendData';
import { ApiResponseOkSchema } from '@/schema/ApiResponse.schema';
import { ApiResponseOk } from '@/schema/ApiResponse.schema';
import { Note } from '@/schema/Note.schema';
import { Button, Paper } from '@mui/material';
import dynamic from 'next/dynamic';
import { DeltaStatic } from 'quill';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FONT_SIZES = [
    '8px',
    '9px',
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
    '32px',
    '42px',
    '54px',
    '68px',
    '84px',
    '98px',
];

// dynamic() can only import react components
const Editor = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
    note: Note;
}

const Notepad: React.FC<Props> = (props) => {
    const [editorContent, setEditorContent] = useState<DeltaStatic | undefined>(
        JSON.parse(props.note.body)
    ); // Object representation of the note body
    const [editorSettings, setEditorSettings] = useState<
        ReactQuill.ReactQuillProps['modules'] | undefined
    >(undefined); // settings for the Quill rich text editor

    const {
        executeRequest,
        isLoading,
        isError,
    } = useSendData('/notes/', 'PATCH'); // hook for updating note through API

    // Rich text editor initialization.
    useEffect(() => {
        // initialize the settings for the Quill rich text editor
        const initSettings = async () => {
            const Quill = (await import('quill')).default;
            const FontSize = Quill.import('formats/size');
            FontSize.whitelist = FONT_SIZES;
            Quill.register(FontSize, true);

            const settings: ReactQuill.ReactQuillProps['modules'] = {
                toolbar: [
                    [{ header: [false, 1, 2, 3, 4, 5, 6] }], // dropdown with header styles
                    [{ font: [] }], // font family
                    [{ size: FONT_SIZES }], // dropdown with custom font sizes

                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'], // more toggled buttons
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme (text color, highlight color)

                    [{ align: [] }], // text alignment with defaults from theme (dropdown)

                    [{ list: 'ordered' }, { list: 'bullet' }], // lists (toggles)
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript (toggles)
                    [{ direction: 'rtl' }], // text direction

                    ['clean'], // remove formatting button
                ],
            };

            setEditorSettings(settings);
        };
        initSettings();
    }, []);

    const handleEditorChange: ReactQuill.ReactQuillProps['onChange'] = (
        _value,
        _delta,
        _source,
        editor
    ) => {
        // we can't use delta directly -- delta only contains a subset of the content
        // getContents() returns the full content as a delta
        setEditorContent(editor.getContents());
    };

    const handleSave = () => {
        executeRequest({ ...props.note, body: JSON.stringify(editorContent) });
    };

    return (
        // id is needed to override default editor styles (increase the specificity)
        <Paper id='editor_wrapper' sx={{ height: '' }}>
            {/* wait for the editor settings to be initialized before rendering the Editor */}
            {editorSettings && (
                <>
                    <Button variant='outlined' onClick={handleSave}>
                        Save
                    </Button>
                    <Editor
                        theme='snow'
                        value={editorContent}
                        onChange={handleEditorChange}
                        modules={editorSettings}
                        style={{ height: '100%' }}
                    />
                </>
            )}
        </Paper>
    );
};

export default Notepad;
