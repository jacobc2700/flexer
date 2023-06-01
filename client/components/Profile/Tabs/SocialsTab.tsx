import { User } from '@/schema/User.schema';
import { KeysMatching } from '@/types';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
    Button,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FormEvent, useState } from 'react';

interface IProps {
    user: User;
    updateProfile: (changes: Partial<User>) => void;
}

interface ISocialLinkInputProps {
    icon: JSX.Element;
    placeholder: string;
    value: string;
    name: string;
    error: boolean;
    errorMsg: string;
}

interface SocialsFormControlsCollection extends HTMLFormControlsCollection {
    github: HTMLInputElement;
    linkedin: HTMLInputElement;
    twitter: HTMLInputElement;
    facebook: HTMLInputElement;
    youtube: HTMLInputElement;
    website: HTMLInputElement;
}

interface SocialsFormElement extends HTMLFormElement {
    readonly elements: SocialsFormControlsCollection;
}

type UserSocials = Partial<
    Pick<
        User,
        'github' | 'linkedin' | 'website' | 'twitter' | 'facebook' | 'youtube'
    >
>;
type UserSocialsValidity = Record<keyof UserSocials, boolean>;

const UserSocialsValidityDefault: UserSocialsValidity = {
    github: true,
    linkedin: true,
    website: true,
    twitter: true,
    facebook: true,
    youtube: true,
};

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
                defaultValue={props.value}
                name={props.name}
                placeholder={props.placeholder}
                error={props.error}
                helperText={props.error && props.errorMsg}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Typography fontSize={12} color='text.secondary'>
                                https://
                            </Typography>
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
};

const SocialsTab: React.FC<IProps> = (props) => {
    const [areSocialsValid, setAreSocialsValid] = useState<UserSocialsValidity>(
        { ...UserSocialsValidityDefault }
    );

    const handleSubmit = (e: FormEvent<SocialsFormElement>) => {
        e.preventDefault();

        const { github, linkedin, twitter, facebook, youtube, website } =
            e.currentTarget.elements;

        const changes: UserSocials = {
            github: github.value.trim(),
            linkedin: linkedin.value.trim(),
            twitter: twitter.value.trim(),
            facebook: facebook.value.trim(),
            youtube: youtube.value.trim(),
            website: website.value.trim(),
        };

        let isValid = true;
        // Remove empty fields, check for link validity, and add https:// to links.
        for (const key of Object.keys(changes)) {
            const value = changes[key as keyof UserSocials];

            if (value === '') delete changes[key as keyof UserSocials];
            else {
                let regex: RegExp | undefined = undefined;
                if (key !== 'website') {
                    regex = new RegExp(`^${key}.com`);
                }
                // https://stackoverflow.com/questions/10306690/what-is-a-regular-expression-which-will-match-a-valid-domain-name-without-a-subd
                else
                    regex = new RegExp(
                        `^(((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}\\.)*(xn--)?([a-z0-9][a-z0-9\\-]{0,60}|[a-z0-9-]{1,30}\\.[a-z]{2,})`
                    );

                if (regex && value && !regex.test(value)) {
                    isValid = false;
                    setAreSocialsValid((prev) => ({
                        ...prev,
                        [key as keyof UserSocials]: false,
                    }));
                    continue;
                }

                changes[key as keyof UserSocials] = `https://${value}`;
            }
        }

        if (isValid) {
            props.updateProfile(changes);
            setAreSocialsValid({ ...UserSocialsValidityDefault });
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <SocialLinkInput
                        icon={<GitHubIcon sx={{ fontSize: 28 }} />}
                        placeholder='GitHub Profile'
                        value={props.user.github}
                        name='github'
                        error={!areSocialsValid.github}
                        errorMsg='Invalid link (Format: github.com/...)'
                    />
                    <SocialLinkInput
                        icon={<LinkedInIcon sx={{ fontSize: 28 }} />}
                        placeholder='LinkedIn Profile'
                        value={props.user.linkedin}
                        name='linkedin'
                        error={!areSocialsValid.linkedin}
                        errorMsg='Invalid link (Format: linkedin.com/...)'
                    />
                    <SocialLinkInput
                        icon={<LinkIcon sx={{ fontSize: 28 }} />}
                        placeholder='Personal Website'
                        value={props.user.website}
                        name='website'
                        error={!areSocialsValid.website}
                        errorMsg='Invalid link (Format: example.com)'
                    />
                    <SocialLinkInput
                        icon={<TwitterIcon sx={{ fontSize: 28 }} />}
                        placeholder='Twitter Profile'
                        value={props.user.twitter}
                        name='twitter'
                        error={!areSocialsValid.twitter}
                        errorMsg='Invalid link (Format: twitter.com/...)'
                    />
                    <SocialLinkInput
                        icon={<FacebookIcon sx={{ fontSize: 28 }} />}
                        placeholder='Facebook Profile'
                        value={props.user.facebook}
                        name='facebook'
                        error={!areSocialsValid.facebook}
                        errorMsg='Invalid link (Format: facebook.com/...)'
                    />
                    <SocialLinkInput
                        icon={<YouTubeIcon sx={{ fontSize: 28 }} />}
                        placeholder='YouTube Channel'
                        value={props.user.youtube}
                        name='youtube'
                        error={!areSocialsValid.youtube}
                        errorMsg='Invalid link (Format: youtube.com/...)'
                    />
                    <Button type='submit'>submit</Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default SocialsTab;
