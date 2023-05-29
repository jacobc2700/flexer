import Notepad from '@/components/UI/Notepad';
import useData from '@/hooks/useData';
import NoteSchema, { Note } from '@/schema/Note.schema';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const NoteDataSchema = z.union([NoteSchema, z.null()]);
type NoteData = z.infer<typeof NoteDataSchema>;

export default function NotepadPage() {
    const router = useRouter();
    const { status } = useSession();

    const [noteId, setNoteId] = useState<string | undefined>(undefined);

    // https://stackoverflow.com/questions/66909552/userouter-query-object-is-empty
    useEffect(() => {
        setNoteId(router.query.noteId as string | undefined);
    }, [router.query]);

    const { data: noteData } = useData<NoteData>(
        `/notes/${noteId}`,
        NoteDataSchema,
        { revalidateOnFocus: false },
        !!noteId && status !== 'loading'
    );

    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'unauthenticated') {
        return <div>Unauthorized</div>;
    } else if (status === 'authenticated') {
        if (!noteData) return <div>Note not found</div>;
        else return <Notepad note={noteData as Note} />;
    }
}
