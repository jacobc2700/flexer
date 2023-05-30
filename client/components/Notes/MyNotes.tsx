import AppContext from '@/contexts/AppContext';
import useData from '@/hooks/useData';
import { NotesDataSchema } from '@/schema/ApiData.schema';
import { NotesData } from '@/schema/ApiData.schema';
import { Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';

const MyNotes: React.FC = () => {
    const { myNotes: notes } = useContext(AppContext);

    const [search, setSearch] = useState<string>('');
    const [filteredNotes, setFilteredNotes] = useState<NotesData>([]);

    useEffect(() => {
        if (search === '') {
            setFilteredNotes(notes);
            return;
        }
        setFilteredNotes(
            notes.filter((n) =>
                n.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [notes, search]);

    return (
        <Container>
            <SearchBar updateQuery={(val) => setSearch(val.trim())} />
            <Container>
                {filteredNotes.map((n) => (
                    <div key={n.note_id}>
                        <h1>{n.title}</h1>
                        <p>{n.body}</p>
                        <p>{n.username}</p>
                    </div>
                ))}
            </Container>
        </Container>
    );
};

export default MyNotes;
