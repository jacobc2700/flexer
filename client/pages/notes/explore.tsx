import PublicNotes from '@/components/Notes/PublicNotes';
import { useSession } from 'next-auth/react';

export default function NotesPage() {
    const { status } = useSession();

    if (status === 'authenticated') {
        return <PublicNotes />;
    } else if (status === 'loading') {
        return <div>Loading...</div>;
    } else {
        return <div>Not logged in</div>;
    }
}
