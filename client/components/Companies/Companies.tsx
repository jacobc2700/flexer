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
    // const [companies, setCompanies] = useState<ICompany[]>([
    //     {
    //         id: '1',
    //         name: 'Facebook',
    //         reviews: 123,
    //         salary: 100000,
    //     },
    //     {
    //         id: '2',
    //         name: 'Google',
    //         reviews: 124,
    //         salary: 105000,
    //     },
    //     {
    //         id: '3',
    //         name: 'Amazon',
    //         reviews: 125,
    //         salary: 120000,
    //     },
    // ]);

    // const { data: session, status } = useSession();

    // useEffect(() => {
    //     console.log(status);

    //     async function getData() {
    //         flag = true;
    //         // const adapter = await ServerAdapter().createVerificationToken({
    //         //     expires: new Date(),
    //         //     identifier: Math.floor(Math.random() * 1000000).toString(),
    //         //     token: Math.floor(Math.random() * 1000000).toString(),
    //         // });
    //         const adapter = await ServerAdapter().getUser("6ece3765-64c8-4b96-b685-2ee5d636127e");
    //         // console.log(adapter);
    //     }

    //     if (flag === false) getData();
    // }, [status]);

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
