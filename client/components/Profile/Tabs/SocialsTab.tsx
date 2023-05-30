import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Paper, Stack, TextField } from '@mui/material';

interface IProps {
    socials: Record<string, string>;
}

interface ISocialLinkInputProps {
    icon: JSX.Element;
    placeholder: string;
    value: string;
}

const SocialLinkInput: React.FC<ISocialLinkInputProps> = (props) => {
    return (
        <Stack
            direction='row'
            spacing={2}
            justifyContent='center'
            alignItems='center'
        >
            {props.icon}
            <TextField
                hiddenLabel
                variant='filled'
                size='small'
                sx={{ width: '100%' }}
                inputProps={{ sx: { fontSize: 12 } }}
                // value={props.value}
                placeholder={props.placeholder}
            />
        </Stack>
    );
};

const SocialsTab: React.FC<IProps> = (props) => {
    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
                <SocialLinkInput
                    icon={<GitHubIcon sx={{ fontSize: 28 }} />}
                    placeholder='GitHub Profile'
                    value=''
                />
                <SocialLinkInput
                    icon={<LinkedInIcon sx={{ fontSize: 28 }} />}
                    placeholder='LinkedIn Profile'
                    value=''
                />
                <SocialLinkInput
                    icon={<LinkIcon sx={{ fontSize: 28 }} />}
                    placeholder='Personal Website'
                    value=''
                />
                <SocialLinkInput
                    icon={<TwitterIcon sx={{ fontSize: 28 }} />}
                    placeholder='Twitter Profile'
                    value=''
                />
                <SocialLinkInput
                    icon={<FacebookIcon sx={{ fontSize: 28 }} />}
                    placeholder='Facebook Profile'
                    value=''
                />
                <SocialLinkInput
                    icon={<YouTubeIcon sx={{ fontSize: 28 }} />}
                    placeholder='YouTube Channel'
                    value=''
                />
            </Stack>
        </Paper>
    );
};

export default SocialsTab;
