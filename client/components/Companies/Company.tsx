import useData from '@/hooks/useData';
import CompanyFullSchema, { CompanyFull } from '@/schema/CompanyFull.schema';
import ServerAdapter from '@/utils/adapter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Paper } from '@mui/material';
// import { TextField } from '@mui/material/TextField';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import SearchBar from '../UI/SearchBar';
import CompanyCard from './CompanyCard';

interface IProps {
    companyName: string;
}

const Company: React.FC<IProps> = (props) => {
    const { data: companyFull, isLoading } = useData<CompanyFull>(
        `http://localhost:8000/companies/${props.companyName}`,
        CompanyFullSchema,
        { revalidateOnFocus: false }
    );

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
                    <div>{companyFull?.company.company_name}</div>
                    <Paper sx={{ mb: 2 }}>
                        {companyFull?.levels
                            .slice(0, 3)
                            .map((level) => JSON.stringify(level))}
                    </Paper>
                    <Paper sx={{ mb: 2 }}>
                        {companyFull?.notes
                            .slice(0, 3)
                            .map((note) => JSON.stringify(note))}
                    </Paper>
                    <Paper>
                        {companyFull?.problems
                            .slice(0, 3)
                            .map((problem) => JSON.stringify(problem))}
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default Company;
