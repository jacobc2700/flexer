import AppContext from '@/contexts/AppContext';
import { CompanyPreview } from '@/schema/CompanyPreview.schema';
import ServerAdapter from '@/utils/adapter';
import { Box, Container, Divider, Typography } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';
import CompanyCard from './CompanyCard';

const Companies: React.FC = () => {
    const { companies: companiesData } = useContext(AppContext);
    const { status } = useSession();

    const [search, setSearch] = useState('');

    const [companies, setCompanies] = useState<CompanyPreview[]>([]);
    const [favoriteCompanies, setFavoriteCompanies] = useState<
        CompanyPreview[]
    >([]);

    const [filteredCompanies, setFilteredCompanies] = useState<
        CompanyPreview[]
    >([]);
    const [filteredFavCompanies, setFilteredFavCompanies] = useState<
        CompanyPreview[]
    >([]);

    useEffect(() => {
        const favIds = new Set<string>();

        // [{company_id: uuid}, {company_id: uuid}, {company_id: uuid}] --> {uuid, uuid, uuid}
        if (companiesData.favorites.length > 0) {
            for (const fav of companiesData.favorites) {
                favIds.add(fav.company_id);
            }
        }

        const favorites = [];
        let notFavorites = [];
        
        // getting preview data based on company ids
        if (favIds.size !== 0) {
            for (const c of companiesData.companies) {
                if (favIds.has(c.id)) {
                    favorites.push(c);
                    favIds.delete(c.id);
                } else {
                    notFavorites.push(c);
                }
            }
        } else {
            notFavorites = companiesData.companies;
        }

        setCompanies(notFavorites);
        setFavoriteCompanies(favorites);
    }, [companiesData]);

    useEffect(() => {
        if (search === '') {
            setFilteredCompanies(companies);
            setFilteredFavCompanies(favoriteCompanies);
            return;
        }

        setFilteredCompanies(
            companies.filter((c) => c.name.toLowerCase().includes(search))
        );
        setFilteredFavCompanies(
            favoriteCompanies.filter((c) =>
                c.name.toLowerCase().includes(search)
            )
        );
    }, [companies, favoriteCompanies, search]);

    return (
        <Container>
            <SearchBar
                updateQuery={(val) => {
                    setSearch(val);
                }}
            />

            {status === 'authenticated' && (
                <>
                    <Typography variant='h3' fontSize={24} fontWeight={600}>
                        My Starred Companies:
                    </Typography>
                    <Box>
                        {filteredFavCompanies.map((c) => (
                            <CompanyCard
                                key={c.id}
                                company={c}
                                favorite={true}
                            />
                        ))}
                    </Box>
                </>
            )}
            <Typography variant='h3' fontSize={24} fontWeight={600}>
                Companies:
            </Typography>
            <Box>
                {filteredCompanies.slice(0, 50).map((c) => (
                    <CompanyCard key={c.id} company={c} favorite={false} />
                ))}
            </Box>
        </Container>
    );
};

export default Companies;
