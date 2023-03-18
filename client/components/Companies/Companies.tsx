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
    //         const resp = await fetch('http://localhost:8000/companies/');
    //         const data: ICompany[] = (await resp.json())[0][1];
    //         setCompanies(data);
    //     };
    useEffect(() => {
<<<<<<< HEAD
        // async function getData() {
        //     let adapter = await ServerAdapter().updateUser({
        //         id: '15af9e68-28a7-4f6b-8b90-5cf7e31d8064',
        //     });
        //     console.log(adapter);
        //     return adapter;
        // }

        // getData();

        ValidateTest(1)
=======
        async function getData() {
            let adapter = await ServerAdapter().linkAccount(
                {userId:'a0c1d851-dc82-49f6-95fc-909b9a847490'}
            );
            console.log(adapter);
            return adapter;
        }

        getData();
>>>>>>> c3f1dd3a382d0fdf0331f0e31d72f2a98d5ca927
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
