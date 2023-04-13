import { ICompanyPreview } from '@/types';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import Link from 'next/link';

interface IProps {
    company: ICompanyPreview;
}

const CompanyCard: React.FC<IProps> = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h3' fontSize={18} fontWeight={600}>
                    <Link style={{ color: 'white' }} href='/companies/company'>
                        {props.company.company_name}
                    </Link>
                </Typography>
                <Divider />
                <Typography>Reviews: {props.company.Reviews}</Typography>
                <Typography>Avg Salaries: {props.company.Salary}</Typography>
            </CardContent>
        </Card>
    );
};

export default CompanyCard;
