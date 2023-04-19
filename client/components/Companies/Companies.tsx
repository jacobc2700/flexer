import AppContext from '@/contexts/AppContext';
import { ICompanyPreview } from '@/types';
import ServerAdapter from '@/utils/adapter';
import Validate from '@/utils/validate';
import { Container } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import SearchBar from '../UI/SearchBar';
import CompanyCard from './CompanyCard';

const Companies: React.FC = () => {
    const companies = useContext(AppContext).companies;
    console.log(companies);

    return (
        <Container>
            <SearchBar />
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            <div>
                {companies.map((c) => (
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
