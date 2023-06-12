import AuthContext from '@/contexts/AuthContext';
import NextAuthSessionSchema from '@/schema/NextAuthSession.schema';
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

interface IProps {
    children?: React.ReactNode;
}

const SessionEmailLayout: React.FC<IProps> = (props) => {
    const { updateEmail } = useContext(AuthContext);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            const val = NextAuthSessionSchema.safeParse(session);
            if (val.success) {
                updateEmail(val.data.user.email);
            }
        }
    }, [session, status, updateEmail]);

    return <>{props.children}</>;
};

export default SessionEmailLayout;
