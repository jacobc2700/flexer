import AppContext from '@/contexts/AppContext';
import { Note } from '@/schema/Note.schema';
import ServerAdapter from '@/utils/adapter';
import { Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';

const Notes: React.FC = () => {
    const { notes } = useContext(AppContext);

    const [search, setSearch] = useState<string>('');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    useEffect(() => {
        if (search === '') {
            setFilteredNotes(notes);
            return;
        }

        setFilteredNotes(notes.filter((n) => n.title.includes(search)));
    }, [notes, search]);

    return (
        <Container>
            <SearchBar updateQuery={(val) => setSearch(val.trim())} />
            <Container>
                {filteredNotes.map((n) => (
                    <div key={n.id}>
                        <h1>{n.title}</h1>
                        <p>{n.body}</p>
                        <p>{n.username}</p>
                    </div>
                ))}
            </Container>
        </Container>
    );
};

export default Notes;
