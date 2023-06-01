import AuthContext from '@/contexts/AuthContext';
import useSendData from '@/hooks/useSendData';
import NextAuthSessionSchema from '@/schema/NextAuthSession.schema';
import { User } from '@/schema/User.schema';
import fetcher from '@/utils/fetcher';
import { Box, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import BottomNav from '../UI/Navigation/BottomNav';
import SideNav from '../UI/Navigation/SideNav';
import BasicUserInfoCard from './BasicUserInfoCard';
import ProfileTabs from './ProfileTabs';

const MyProfile: React.FC = () => {
    const { user, updateEmail } = useContext(AuthContext);
    const { data: session, status } = useSession();

    const [activeTab, setActiveTab] = useState(0);

    const {
        executeRequest: updateProfile,
        isLoading,
        isError,
    } = useSendData<Partial<User>>(`/users/${user?.id}`, 'PATCH');

    // TODO: this code needs to moved somewhere else.
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
        <>
            <Container
                sx={{
                    // height: '100vh',
                    position: 'relative',
                }}
            >
                <SideNav />
                {user && (
                    <>
                        <BasicUserInfoCard
                            firstName={user.first_name}
                            lastName={user.last_name}
                            username={user.username}
                            image={user.image}
                        />
                        <Box sx={{ mt: 1 }} />
                        <ProfileTabs
                            user={user}
                            activeTab={activeTab}
                            changeActiveTab={handleChangeActiveTab}
                            updateProfile={updateProfile}
                        />
                    </>
                )}
            </Container>
            <BottomNav />
        </>
    );
};

export default MyProfile;
