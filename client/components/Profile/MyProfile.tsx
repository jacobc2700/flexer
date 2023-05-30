import AuthContext from '@/contexts/AuthContext';
import NextAuthSessionSchema from '@/schema/NextAuthSession.schema';
import { Box, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import Navigation from '../UI/Navigation';
import BasicUserInfoCard from './BasicUserInfoCard';
import ProfileTabs from './ProfileTabs';

const MyProfile: React.FC = () => {
    const { user, updateEmail } = useContext(AuthContext);
    const { data: session, status } = useSession();

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (status === 'authenticated') {
            const val = NextAuthSessionSchema.safeParse(session);
            if (val.success) {
                updateEmail(val.data.user.email);
            }
        }
    }, [session, status, updateEmail]);

    const handleChangeActiveTab = (
        _event: React.SyntheticEvent,
        newActiveTab: number
    ) => {
        setActiveTab(newActiveTab);
    };

    return (
        <Container
            sx={{
                height: '100vh',
                position: 'relative',
            }}
        >
            <Navigation />
            {user && (
                <>
                    <BasicUserInfoCard
                        firstName={user.first_name}
                        lastName={user.last_name}
                        username={user.username}
                        image={user.image}
                    />
                    <Box sx={{mt: 1}}/>
                    <ProfileTabs
                        user={user}
                        activeTab={activeTab}
                        changeActiveTab={handleChangeActiveTab}
                    />
                </>
            )}
        </Container>
    );
};

export default MyProfile;
