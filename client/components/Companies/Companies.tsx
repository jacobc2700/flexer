import { ICompany } from '@/types';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';

// @ == ../
import ServerAdapter from '../../utils/adapter';
import CompanyCard from './CompanyCard';

const Companies: React.FC = () => {
    // const [companies, setCompanies] = useState<ICompany[]>([]);

    // useEffect(() => {
    //     const fetcher = async () => {
    //         const resp = await fetch('http://localhost:8000/companies/');
    //         const data: ICompany[] = (await resp.json())[0][1];
    //         setCompanies(data);
    //     };
    useEffect(() => {
        async function getData() {
            let adapter = await ServerAdapter().updateUser({
                id: '15af9e68-28a7-4f6b-8b90-5cf7e31d8064',
            });
            console.log(adapter);
            return adapter;
        }

        getData();
    }, []);

    //     fetcher();
    // }, []);

    return (
        // <Container sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        //     {companies.map((c) => (
        //         <CompanyCard company={c} key={c.name} />
        //     ))}
        // </Container>
        <div>hello</div>
    );
};

export default Companies;
