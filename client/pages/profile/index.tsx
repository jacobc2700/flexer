import MyProfile from '@/components/Profile/MyProfile';
import { useSession } from 'next-auth/react';

export default function Index() {
    const { status } = useSession();

    if (status === 'authenticated') {
        return <MyProfile />;
    } else if (status === 'loading') {
        return <div>Loading...</div>;
    } else {
        return <div>Not logged in</div>;
    }
}
