import useData from '@/hooks/useData';
import CompanyFullSchema, { CompanyFull } from '@/schema/CompanyFull.schema';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Paper } from '@mui/material';
import Link from 'next/link';

interface IProps {
    companyName: string;
}

const Company: React.FC<IProps> = (props) => {
    const { data: companyFull, isLoading } = useData<CompanyFull>(
        `/companies/${props.companyName}`,
        CompanyFullSchema,
        { revalidateOnFocus: false }
    );

    return (
        <>
            {isLoading === true ? (
                <Box>Loading...</Box>
            ) : (
                <Container>
                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                    <Link style={{ color: 'white' }} href='/companies/'>
                        <ArrowBackIcon />
                    </Link>
                    <Box>
                        {companyFull?.company.company_name}
                        {companyFull?.isFavorite ? '★' : ''}
                    </Box>
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
