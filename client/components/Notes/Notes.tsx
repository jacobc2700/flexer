import AppContext from '@/contexts/AppContext';
import { ICompanyPreview } from '@/types';
import ServerAdapter from '@/utils/adapter';
import Validate from '@/utils/validate';
import { Container } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';

const Notes: React.FC = () => {
    const notes = useContext(AppContext).notes;

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredNotes, setFilteredNotes] = useState<unknown[]>([]);

    console.log(notes);

    useEffect(() => {
        if (searchQuery !== '') 
            setFilteredNotes(notes.filter((n) => n.title.includes(searchQuery)))
        else
            setFilteredNotes(notes);
    }, [notes, searchQuery]);

    return (
        <Container>
            <SearchBar updateQuery={(val) => setSearchQuery(val.trim())} />
            <Container>
                {filteredNotes.map((n) => (
                    <div key={n.id}>
                        <h1>{n.title}</h1>
                        <p>{n.content}</p>
                        <p>{n.username}</p>
                    </div>
                ))}
            </Container>
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            {/* <div>
                {companies.map((c) => (
                    <CompanyCard key={c.id} company={c} />
                ))}
            </div> */}
        </Container>
    );
};

export default Notes;
