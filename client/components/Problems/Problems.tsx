import AppContext from '@/contexts/AppContext';
import { Box, Container, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import SearchBar from '../UI/SearchBar';
import { Problem } from '@/schema/Problem.schema';

const difficulty = new Map();
difficulty.set(1, ['E', '#A2DED0']);
difficulty.set(2, ['M', '#FFE5B4']);
difficulty.set(3, ['H', '#FFC2C2']);

const Problems: React.FC = () => {
    const { problems } = useContext(AppContext);
    const [search, setSearch] = useState('');
    const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);

    useEffect(() => {
        if (search === '') {
            setFilteredProblems(problems);
            return;
        }

        setFilteredProblems(
            problems.filter((p) => p.question_title.toLowerCase().includes(search))
        );
    }, [problems, search]);

    return (
        <Container>
            <SearchBar updateQuery={(val) => setSearch(val.toLowerCase())} />
            <TableContainer component={Paper}>
                <Table aria-label='problems table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align='right'></TableCell>
                            <TableCell align='right'>Difficulty</TableCell>
                            <TableCell align='right'>Acceptance</TableCell>
                            <TableCell align='right'>Frequency</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProblems.slice(0, 10).map((row) => {
                            const [difficulty_name, difficulty_color] =
                                difficulty.get(row.difficulty);

                            let acceptance = (
                                (row.total_accepted / row.total_submitted) *
                                100
                            ).toFixed(1);
                            if (row.total_submitted === 0) acceptance = '0';

                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        <Typography color={difficulty_color}>
                                            {row.question_title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='right'>TODO</TableCell>
                                    <TableCell align='right'>
                                        <Typography color={difficulty_color}>
                                            {difficulty_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='right'>
                                        {acceptance}%
                                    </TableCell>
                                    <TableCell align='right'>TODO</TableCell>
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
