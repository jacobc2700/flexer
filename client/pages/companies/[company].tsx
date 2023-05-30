import { useRouter } from 'next/router';

import Company from '../../components/Companies/Company';

export default function CompanyPage() {
    const router = useRouter();
    const { company } = router.query;

    return <Company companyName={company?.toString().toUpperCase() ?? ''} />;
}
