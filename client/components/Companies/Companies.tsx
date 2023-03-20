import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ICompany } from '../../types';

import ServerAdapter from '../../utils/adapter';
import Validate from '../../utils/validate';
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

    useEffect(() => {
        async function getData() {
            flag = true;
            // const adapter = await ServerAdapter().createVerificationToken({
            //     expires: new Date(),
            //     identifier: Math.floor(Math.random() * 1000000).toString(),
            //     token: Math.floor(Math.random() * 1000000).toString(),
            // });
            const adapter = await ServerAdapter().useVerificationToken({
                token: '9006',
                identifier: '457843',
            });
            console.log(adapter);
        }

        if (flag === false) getData();
    }, []);

    return <div>hello</div>;
};

export default Companies;
