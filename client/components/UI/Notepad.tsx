import { Box } from '@mui/material';
import { useState } from 'react';
import Editor from './Test';

interface IProps {
    richText: string;
}

const Notepad: React.FC<IProps> = (props) => {
    return <Box><Editor /></Box>
};

export default Notepad;
