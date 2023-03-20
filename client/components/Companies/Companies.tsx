import { ICompany } from '@/types';
import ServerAdapter from '@/utils/adapter';
import Validate from '@/utils/validate';
import { Container } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import CompanyCard from './CompanyCard';

let flag = false; // TEMP: prevents a second api call from being made in useeffect

const Companies: React.FC = () => {
    // const [companies, setCompanies] = useState<ICompany[]>([]);

    // useEffect(() => {
    //     const fetcher = async () => {
    //         const resp = await fetch('http://localhost:8000/auth/session/');
    //         const data: ICompany[] = (await resp.json())[0][1];
    //         setCompanies(data);
    //     };

    const { data: session, status } = useSession();

    useEffect(() => {
        console.log(status);

        async function getData() {
            flag = true;
            // const adapter = await ServerAdapter().createVerificationToken({
            //     expires: new Date(),
            //     identifier: Math.floor(Math.random() * 1000000).toString(),
            //     token: Math.floor(Math.random() * 1000000).toString(),
            // });
            // const adapter = await ServerAdapter().useVerificationToken({
            //     token: '9006',
            //     identifier: '457843',
            // });
            // console.log(adapter);
        }

        if (flag === false) getData();
    }, [status]);

    return (
        <div>
            <button onClick={() => signIn()}>fd</button>
            {status === 'authenticated' && session && 'user' in session && (
                <p>Signed in as {session.user?.email ?? 'die'}</p>
            )}
            {status !== 'authenticated' && (
                <a href='/api/auth/signin'>Sign in</a>
            )}
        </div>
    );
};

export default Companies;
