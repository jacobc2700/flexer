import { ICompany } from '@/types';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

import CompanyCard from './CompanyCard';

const Companies: React.FC = () => {
    const [companies, setCompanies] = useState<ICompany[]>([]);

    useEffect(() => {
        const fetcher = async () => {
            const resp = await fetch('http://localhost:8000/companies/');
            const data: ICompany[] = (await resp.json())[0][1];
            setCompanies(data);
        };

        fetcher();
    }, []);

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            {companies.map((c) => (
                <CompanyCard company={c} key={c.name} />
            ))}
        </Container>
    );
};

export default Companies;
