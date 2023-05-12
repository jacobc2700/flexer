import AppContext from '@/contexts/AppContext';
import AuthContext from '@/contexts/AuthContext';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import Navigation from '../UI/Navigation';
import NextAuthSessionSchema from '@/schema/NextAuthSession.schema';

const Home: React.FC = () => {
    const { user, updateEmail } = useContext(AuthContext);
    const { updateUsername } = useContext(AppContext);

    // const {data: session, status} = useSession();
    const [isEditable, setIsEditable] = useState(false);

    const { data, status } = useSession();

    useEffect(() => {
        console.log(status);
        if (status === 'authenticated') {
            const val = NextAuthSessionSchema.safeParse(data);
            if (val.success) {
                updateEmail(val.data.user.email);
            }
        }
    }, [data, status, updateEmail]);

    useEffect(() => {
        if (status === 'authenticated') {
            updateUsername(user?.username ?? '');
        }
    }, [user, updateUsername, status]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <Container
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'space-around',
            }}
        >
            <Navigation />
            <Button
                sx={{ position: 'absolute', right: 0, top: 0 }}
                href='#'
                onClick={() => setIsEditable((prev) => !prev)}
            >
                Edit
            </Button>
            <Box>
                <Box sx={{ mb: 1 }}>
                    <Image
                        src={(user && user.image) ?? ''}
                        alt='profile'
                        height={100}
                        width={100}
                        style={{ borderRadius: '100%' }}
                    />
                </Box>

                <Paper>
                    <Typography py={0.5} px={1}>
                        {user && user.username}
                    </Typography>
                </Paper>
            </Box>
            <Paper>
                <Typography py={0.5} px={1}>
                    {user && user.email}
                </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
                    <Stack direction='row' spacing={2}>
                        <FacebookIcon sx={{ fontSize: 28 }} />
                        <GitHubIcon sx={{ fontSize: 28 }} />
                        <InstagramIcon sx={{ fontSize: 28 }} />
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <LinkIcon sx={{ fontSize: 28 }} />
                        <TwitterIcon sx={{ fontSize: 28 }} />
                        <YouTubeIcon sx={{ fontSize: 28 }} />
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Home;
