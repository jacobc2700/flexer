import { ICompany } from '@/types';
import ServerAdapter from '@/utils/adapter';
import Validate from '@/utils/validate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container } from '@mui/material';
// import { TextField } from '@mui/material/TextField';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';
import CompanyCard from './CompanyCard';

const Company: React.FC = (props) => {
    // Make a new API call to get the company data
    return (
        <Container>
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            <Link style={{ color: 'white' }} href='/companies/'>
                <ArrowBackIcon />
            </Link>
            <div>a company name goes here</div>
        </Container>
    );
};

export default Company;
