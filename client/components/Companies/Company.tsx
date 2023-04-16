import { ICompany } from '@/types';
import ServerAdapter from '@/utils/adapter';
import fetcher from '@/utils/fetcher';
import Validate from '@/utils/validate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Paper } from '@mui/material';
// import { TextField } from '@mui/material/TextField';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import SearchBar from '../UI/SearchBar';
import CompanyCard from './CompanyCard';

const Company: React.FC = (props) => {
    const { data: companyResp, isLoading } = useSWR(
        'http://localhost:8000/companies/GOOGLE',
        fetcher,
        { revalidateOnFocus: false }
    );

    console.log(companyResp);

    return (
        <>
            {isLoading === true ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                    <Link style={{ color: 'white' }} href='/companies/'>
                        <ArrowBackIcon />
                    </Link>
                    <div>{companyResp?.data.company.company_name}</div>
                    <Paper sx={{mb: 2}}>
                        {companyResp?.data.levels.slice(0, 3).map((level) => JSON.stringify(level))}
                    </Paper>
                    <Paper sx={{mb: 2}}>
                        {companyResp?.data.notes.slice(0, 3).map((note) => JSON.stringify(note))}
                    </Paper>
                    <Paper>
                        {companyResp?.data.problems.slice(0, 3).map((problem) => JSON.stringify(problem))}
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default Company;
