// import AuthContext from '@/contexts/AuthContext';
// import NextAuthSessionSchema from '@/schema/NextAuthSession.schema';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkIcon from '@mui/icons-material/Link';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import {
//     Box,
//     Button,
//     Container,
//     Divider,
//     Paper,
//     Stack,
//     Typography,
// } from '@mui/material';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import { useContext, useEffect, useState } from 'react';

// import Navigation from '../UI/Navigation';

// const Home: React.FC = () => {
//     const { user, updateEmail } = useContext(AuthContext);

//     const [isEditable, setIsEditable] = useState(false);

//     const { data: session, status } = useSession();

//     useEffect(() => {
//         if (status === 'authenticated') {
//             const val = NextAuthSessionSchema.safeParse(session);
//             if (val.success) {
//                 updateEmail(val.data.user.email);
//             }
//         }
//     }, [session, status, updateEmail]);

//     useEffect(() => {
//         console.log(user);
//     }, [user]);

//     return (
//         <Container
//             sx={{
//                 height: '100vh',
//                 position: 'relative',
//             }}
//         >
//             <Navigation />
//             <Button
//                 sx={{ position: 'absolute', right: 0, top: 0 }}
//                 href='#'
//                 onClick={() => setIsEditable((prev) => !prev)}
//             >
//                 Edit
//             </Button>
//             <Box>
//                 <Typography
//                     variant='h5'
//                     sx={{ mb: 1 }}
//                     fontWeight={500}
//                     textTransform='uppercase'
//                     textAlign='center'
//                 >
//                     My Profile
//                 </Typography>
//                 <Divider />
//                 <Stack
//                     direction='row'
//                     alignItems='center'
//                     justifyContent='center'
//                     spacing={4}
//                     sx={{ my: 2 }}
//                 >
//                     <Image
//                         // src={(user && user.image) ?? ''}
//                         src='https://picsum.photos/seed/picsum/200'
//                         alt='profile'
//                         height={84}
//                         width={84}
//                         style={{
//                             borderRadius: '100%',
//                             border: '3px solid #fff',
//                         }}
//                     />
//                     <Stack spacing={0.75}>
//                         <Typography variant='h6'>
//                             {user && `${user.first_name} ${user.last_name}`}
//                         </Typography>
//                         <Typography color='text.secondary'>
//                             {user && user.username}
//                         </Typography>
//                     </Stack>
//                 </Stack>
//             </Box>
//             {/* <Paper sx={{ p: 2 }}>
//                 <Stack spacing={2}>
//                     <Stack direction='row' spacing={2}>
//                         <FacebookIcon sx={{ fontSize: 28 }} />
//                         <GitHubIcon sx={{ fontSize: 28 }} />
//                         <InstagramIcon sx={{ fontSize: 28 }} />
//                     </Stack>
//                     <Stack direction='row' spacing={2}>
//                         <LinkIcon sx={{ fontSize: 28 }} />
//                         <TwitterIcon sx={{ fontSize: 28 }} />
//                         <YouTubeIcon sx={{ fontSize: 28 }} />
//                     </Stack>
//                 </Stack>
//             </Paper> */}
//         </Container>
//     );
// };

// export default Home;
