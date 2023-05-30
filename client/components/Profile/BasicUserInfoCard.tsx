import { Box, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const LINE_COLOR = '#222';

interface IProps {
    firstName?: string;
    lastName?: string;
    username?: string;
    image?: string | null;
}

const BasicUserInfoCard: React.FC<IProps> = (props) => {
    return (
        <Box>
            <Typography
                variant='h5'
                sx={{ mb: 2 }}
                fontWeight={500}
                textTransform='uppercase'
                textAlign='center'
            >
                My Profile
            </Typography>
            <Box
                sx={{
                    position: 'relative',
                    border: `1px solid ${LINE_COLOR}`,
                    py: 2,
                }}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    spacing='clamp(1rem, 5vw, 3rem)'
                >
                    <Image
                        // src={(user && user.image) ?? ''}
                        src='https://picsum.photos/seed/picsum/200'
                        alt='profile'
                        height={84}
                        width={84}
                        style={{
                            borderRadius: '100%',
                            border: '3px solid #fff',
                            marginLeft: '1rem',
                        }}
                    />
                    <Stack spacing={0.75} sx={{ overflow: 'hidden' }}>
                        <Typography
                            variant='h6'
                            sx={{ wordWrap: 'break-word' }}
                        >
                            {`${props.firstName ?? ''} ${props.lastName ?? ''}`}
                        </Typography>
                        <Typography
                            color='text.secondary'
                            sx={{ wordWrap: 'break-word' }}
                        >
                            {props.username ?? ''}
                        </Typography>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: -1,
                        height: '100%',
                        width: '100%',
                        top: 0,
                        left: 0,
                        backgroundImage: `repeating-linear-gradient(-24deg, transparent, transparent 4px, ${LINE_COLOR}  2px, ${LINE_COLOR} 5px)`,
                    }}
                />
            </Box>
        </Box>
    );
};

export default BasicUserInfoCard;
