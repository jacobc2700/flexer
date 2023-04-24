import {
    Card,
    CardContent,
    Divider,
    TextField,
    Typography,
} from '@mui/material';

interface IProps {
    updateQuery: (query: string) => void;
}

const SearchBar: React.FC<IProps> = (props) => {
    return (
        <TextField
            id='standard-basic'
            label='Search for something...'
            variant='standard'
            onChange={(e) => props.updateQuery(e.target.value)}
        />
    );
};

export default SearchBar;
