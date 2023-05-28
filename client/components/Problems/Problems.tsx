import AppContext from '@/contexts/AppContext';
import { Problem } from '@/schema/Problem.schema';
import { Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';

const difficulty = new Map();
difficulty.set(1, ['Easy', '#A2DED0']);
difficulty.set(2, ['Mid', '#FFE5B4']);
difficulty.set(3, ['Hard', '#FFC2C2']);

const Problems: React.FC = () => {
    const { problems: problemsData } = useContext(AppContext);
    const [search, setSearch] = useState('');

    const [problems, setProblems] = useState<Problem[]>([]);
    const [favoriteProblems, setFavoriteProblems] = useState<Problem[]>([]);

    const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
    const [filteredFavProblems, setFilteredFavProblems] = useState<Problem[]>(
        []
    );

    useEffect(() => {
        const favIds = new Set<string>();
        if (problemsData.favorites.length > 0) {
            for (const fav of problemsData.favorites) {
                favIds.add(fav.problem_id);
            }
        }

        const favorites = [];
        let notFavorites = [];

        if (favIds.size !== 0) {
            for (const c of problemsData.problems) {
                if (favIds.has(c.id)) {
                    favorites.push(c);
                    favIds.delete(c.id);
                } else {
                    notFavorites.push(c);
                }
            }
        } else {
            notFavorites = problemsData.problems;
        }

        setProblems(notFavorites);
        setFavoriteProblems(favorites);
    }, [problemsData]);

    useEffect(() => {
        if (search === '') {
            setFilteredProblems(problems);
            setFilteredFavProblems(favoriteProblems);
            return;
        }

        setFilteredProblems(
            problems.filter((p) =>
                p.question_title.toLowerCase().includes(search)
            )
        );
        setFilteredFavProblems(
            favoriteProblems.filter((p) =>
                p.question_title.toLowerCase().includes(search)
            )
        );
    }, [problems, favoriteProblems, search]);

    return (
        <Container>
            <SearchBar updateQuery={(val) => setSearch(val.toLowerCase())} />
            <TableContainer component={Paper}>
                <Table aria-label='problems table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align='center'>Starred</TableCell>
                            <TableCell align='right'>Difficulty</TableCell>
                            <TableCell align='right'>Acceptance</TableCell>
                            <TableCell align='right'>Attempts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFavProblems
                            .concat(filteredProblems)
                            .slice(0, 50)
                            .map((row, idx) => {
                                if (idx === 0) console.log(row);

                                const [difficulty_name, difficulty_color] =
                                    difficulty.get(row.difficulty);

                                let acceptance = (
                                    (row.total_accepted / row.total_submitted) *
                                    100
                                ).toFixed(1);
                                if (row.total_submitted === 0) acceptance = '0';

                                const isFavorite =
                                    idx < filteredFavProblems.length;

                                return (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component='th' scope='row'>
                                            <Typography
                                                color={difficulty_color}
                                            >
                                                {row.question_title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography color="yellow">{isFavorite ? '★' : ''}</Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Typography
                                                color={difficulty_color}
                                            >
                                                {difficulty_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            {acceptance}%
                                        </TableCell>
                                        <TableCell align='right'>
                                            {row.total_submitted.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Problems;
