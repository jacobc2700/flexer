import { CompanyPreview } from '@/schema/CompanyPreview.schema';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import Link from 'next/link';

interface IProps {
    company: CompanyPreview;
    favorite: boolean;
}

const CompanyCard: React.FC<IProps> = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h3' fontSize={18} fontWeight={600}>
                    <Link style={{ color: 'white' }} href='/companies/company'>
                        {props.company.name} {props.favorite ? '★' : ''}
                    </Link>
                </Typography>
                <Divider />
                <Typography>Reviews: {props.company.reviews}</Typography>
                <Typography>Avg Salaries: {props.company.salary}</Typography>
            </CardContent>
        </Card>
    );
};

export default CompanyCard;
