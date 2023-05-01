import AppContext from '@/contexts/AppContext';
import ServerAdapter from '@/utils/adapter';
import { Container } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';
import CompanyCard from './CompanyCard';
import { CompanyPreview } from '@/schema/CompanyPreview.schema';

const Companies: React.FC = () => {
    const { companies } = useContext(AppContext);

    const [search, setSearch] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState<CompanyPreview[]>([]);

    useEffect(() => {
        if (search === '') {
            setFilteredCompanies(companies);
            return;
        }

        setFilteredCompanies(
            companies.filter((c) =>
                c.name.toLowerCase().includes(search)
            )
        );
    }, [companies, search]);

    return (
        <Container>
            <SearchBar
                updateQuery={(val) => {
                    setSearch(val);
                }}
            />
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            <div>
                {filteredCompanies.slice(0, 10).map((c) => (
                    <CompanyCard key={c.id} company={c} />
                ))}
            </div>
        </Container>
        // <SearchBar/>
        // // <TextField id="standard-basic" label="Standard" variant="standard" />
        // <div>
        //     {companies.map((c) => (
        //         <CompanyCard
        //             key={c.id}
        //             company={c}
        //         />
        //     ))}
        // </div>
        // <div>
        //     <button onClick={() => signIn()}>fd</button>
        //     {status === 'authenticated' && session && 'user' in session && (
        //         <p>Signed in as {session.user?.email ?? 'die'}</p>
        //     )}
        //     {status !== 'authenticated' && (
        //         <a href='/api/auth/signin'>Sign in</a>
        //     )}
        // </div>
    );
};

export default Companies;
