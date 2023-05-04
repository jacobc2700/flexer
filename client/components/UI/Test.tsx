import EditorJS from '@editorjs/editorjs';

import { Box } from '@mui/material';
import { useRef } from 'react';

const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: 'header',
            data: {
                text: 'This is my awesome editor!',
                level: 1,
            },
        },
    ],
};

const Test: React.FC = () => {
    const ref = useRef<EditorJS | null>(null);

    const init = async () => {
        const lib = await import('@editorjs/editorjs');
        const Header = (await import('@editorjs/header')).default;
        const editor = new lib.default({
            holder: 'editorjs',
            onReady: () => {
                ref.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                const content = await editor.saver.save();

                console.log(content);
            },
            tools: {
                header: Header,
            },
        });
    };

    init();

    return <Box id='editorjs' ref={ref}></Box>;
};

export default Test;
