import BusinessIcon from '@mui/icons-material/Business';
import DataObjectIcon from '@mui/icons-material/DataObject';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Avatar, Box, Fab, useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React, { useState } from 'react';

interface IProps {
    navHeight: number;
}

const BottomNav: React.FC<IProps> = (props) => {
    const theme = useTheme();
    const isXsQuery = useMediaQuery(
        `(max-width: ${theme.breakpoints.values.sm / 1.5}px)`
    );

    const [activeNav, setActiveNav] = useState(0);

    return (
        <BottomNavigation
            showLabels={!isXsQuery}
            value={activeNav}
            onChange={(_event, newValue) => {
                setActiveNav(newValue);
            }}
            sx={{
                height: props.navHeight,
                backgroundColor: '#212121',
                borderTop: '1px solid #777',
            }}
        >
            <BottomNavigationAction label='Home' icon={<HomeIcon />} />
            <BottomNavigationAction label='Companies' icon={<BusinessIcon />} />
            <Box sx={{ px: 1, m: 'auto' }}>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{ height: 40, width: 40 }}
                >
                    <Avatar
                        alt='Remy Sharp'
                        src='https://picsum.photos/seed/picsum/200'
                        sx={{ border: '2px solid #fff' }}
                    />
                </Fab>
            </Box>
            <BottomNavigationAction label='Notes' icon={<LibraryBooksIcon />} />
            <BottomNavigationAction
                label='Problems'
                icon={<DataObjectIcon />}
            />
        </BottomNavigation>
    );
};

export default BottomNav;
