import { User } from '@/schema/User.schema';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import AccountTab from './Tabs/AccountTab';
import SocialsTab from './Tabs/SocialsTab';

interface IProps {
    user: User;
    activeTab: number;
    changeActiveTab: (event: React.SyntheticEvent, tab: number) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
};

const ProfileTabs: React.FC<IProps> = (props) => {
    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={props.activeTab}
                    onChange={props.changeActiveTab}
                    variant='fullWidth'
                    textColor='secondary'
                    indicatorColor='secondary'
                    aria-label='my profile tabs'
                >
                    <Tab
                        label='Account'
                        sx={{ textTransform: 'capitalize', letterSpacing: 1 }}
                    />
                    <Tab
                        label='Socials'
                        sx={{ textTransform: 'capitalize', letterSpacing: 1 }}
                    />
                    <Tab
                        label='Settings'
                        sx={{ textTransform: 'capitalize', letterSpacing: 1 }}
                    />
                </Tabs>
            </Box>
            <TabPanel value={props.activeTab} index={0}>
                <AccountTab
                    email={props.user.email}
                    username={props.user.username}
                />
            </TabPanel>
            <TabPanel value={props.activeTab} index={1}>
                {/* TODO: actually get the social links to be saved in the database */}
                <SocialsTab socials={{}} />
            </TabPanel>
            <TabPanel value={props.activeTab} index={2}>
                Settings
            </TabPanel>
        </Box>
    );
};

export default ProfileTabs;
