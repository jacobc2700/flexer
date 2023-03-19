import { ICompany } from '@/types';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

// @ == ../
import ServerAdapter from '../../utils/adapter';
import { ValidateTest } from '../../utils/validate';
import CompanyCard from './CompanyCard';

const Companies: React.FC = () => {
    // const [companies, setCompanies] = useState<ICompany[]>([]);

    // useEffect(() => {
    //     const fetcher = async () => {
    //         const resp = await fetch('http://localhost:8000/auth/session/');
    //         const data: ICompany[] = (await resp.json())[0][1];
    //         setCompanies(data);
    //     };
    useEffect(() => {
        async function getData() {
            let adapter = await ServerAdapter().useVerificationToken({
                identifier: '31231asdasdasdads23123123',
                token: '32123sd1231',
            });
            console.log(adapter);
            return adapter;
        }

        getData();
    });

    //     // getData();

    //     ValidateTest(1)
    // }, []);

    //     fetcher();
    // }, []);

    return <div>hello</div>;
};

export default Companies;
