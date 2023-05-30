import EmailIcon from '@mui/icons-material/Email';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

interface IProps {
    email: string;
    username: string;
}

const AccountTab: React.FC<IProps> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogOk = () => {
        setIsDialogOpen(false);
        signOut({ callbackUrl: '/' });
    };

    return (
        <>
            <Box>
                <Typography variant='h6' fontSize={18} mb={1}>
                    Email Address:
                </Typography>
                <TextField
                    variant='filled'
                    size='small'
                    value={props.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <EmailIcon sx={{ fontSize: 28 }} />
                            </InputAdornment>
                        ),
                    }}
                    hiddenLabel
                    disabled
                />

                <Divider sx={{ my: 4 }} />
                <Button
                    variant='outlined'
                    color='warning'
                    onClick={() => setIsDialogOpen(true)}
                >
                    Sign Out
                </Button>
            </Box>

            <Dialog open={isDialogOpen}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to sign out?
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        variant='contained'
                        color='info'
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='warning'
                        variant='outlined'
                        onClick={handleDialogOk}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AccountTab;
