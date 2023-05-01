import AppContext from '@/contexts/AppContext';
import AuthContext from '@/contexts/AuthContext';
import Validate from '@/utils/validate';
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
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import Navigation from '../UI/Navigation';

type uuid = string;
type visibility = 'PRIVATE' | 'PUBLIC';

interface IUser {
    id: uuid;
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    visibility: visibility;
    emailVerified: string | null;
    image: string;
}

const Home: React.FC = () => {
    const { user, updateEmail } = useContext(AuthContext);
    const { updateUsername } = useContext(AppContext);

    // const {data: session, status} = useSession();
    const [isEditable, setIsEditable] = useState(false);

    // const [user, setUser] = useState<IUser | null>({
    //     id: '6ece3765-64c8-4b96-b685-2ee5d636127e',
    //     email: 'andrewzhlee@gmail.com',
    //     password: '155309252',
    //     username: 'bingbong',
    //     first_name: 'bing',
    //     last_name: 'bong',
    //     created_at: '2023-03-20T03:12:48.472237+00:00',
    //     updated_at: '2023-03-20T03:12:48.472237+00:00',
    //     visibility: 'PRIVATE',
    //     emailVerified: null,
    //     image: 'https://picsum.photos/200/300',
    // });

    // const notes = useContext(AppContext);
    // console.log(notes)

    const { data, status } = useSession();

    useEffect(() => {
        console.log(data, status);
        if (
            status === 'authenticated' &&
            data &&
            'user' in data &&
            data.user &&
            'email' in data.user &&
            data.user.email
        ) {
            updateEmail(data.user.email);
        }
    }, [data, status, updateEmail]);

    useEffect(() => {
        updateUsername(user?.username ?? '');
    }, [user, updateUsername]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    // useEffect(() => {
    //     const getUserData = async () => {
    //         if (session && 'user' in session) {
    //             const rawResp = await fetch(
    //                 `http://localhost:8000/auth/email-address/${
    //                     session.user?.email ?? ''
    //                 }`
    //             );
    //             const resp = await rawResp.json();
    //             console.log(resp);
    //             if (
    //                 Validate.isValidResponse(resp) &&
    //                 Validate.isResponseOk(resp)
    //             ) {
    //                 setUser(resp.data);
    //             }
    //         }
    //     };
    //     getUserData();
    // }, [session]);

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
            {/* <button onClick={() => signIn()}>signin</button> */}
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
