import { Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

import { ICompany } from '../../types';

interface IProps {
    company: ICompany;
}

const CompanyCard: React.FC<IProps> = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h3' fontSize={18} fontWeight={600}>
                    {props.company.name}
                </Typography>
                <Divider />
                <Typography>Reviews: {props.company.reviews}</Typography>
                <Typography>Avg Salaries: {props.company.salary}</Typography>
            </CardContent>
        </Card>
    );
};

export default CompanyCard;
