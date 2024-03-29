import MyNotes from '@/components/Notes/MyNotes';
import { useSession } from 'next-auth/react';

export default function NotesPage() {
    const { status } = useSession();

    if (status === 'authenticated') {
        return <MyNotes />;
    } else if (status === 'loading') {
        return <div>Loading...</div>;
    } else {
        return <div>Not logged in</div>;
    }
}
