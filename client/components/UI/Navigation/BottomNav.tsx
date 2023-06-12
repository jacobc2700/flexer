import { Avatar, Box, Fab, useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';

import { navItem } from '../Layouts/NavigationLayout';

interface IProps {
    navHeight: number;
    navItems: navItem[];
    updateActiveNav: (navIdx: number) => void;
    activeNav: number;
}

const BottomNav: React.FC<IProps> = (props) => {
    const theme = useTheme();
    const isXsQuery = useMediaQuery(
        `(max-width: ${theme.breakpoints.values.sm / 1.5}px)`
    );

    return (
        <BottomNavigation
            showLabels={!isXsQuery}
            value={props.activeNav}
            onChange={(_event, newValue) => {
                props.updateActiveNav(newValue);
            }}
            sx={(theme) => ({
                height: props.navHeight,
                backgroundColor: theme.palette.grey[900],
                borderTop: `1px solid ${theme.palette.grey[600]}`,
            })}
        >
            {props.navItems.map((item, idx) =>
                idx !== 2 ? (
                    <BottomNavigationAction
                        key={`bottom-nav-${item.title}`}
                        label={item.title}
                        icon={item.icon}
                    />
                ) : (
                    <Box
                        sx={{ px: 1, m: 'auto' }}
                        key={`bottom-nav-${item.title}`}
                    >
                        <Fab
                            color='primary'
                            aria-label='add'
                            sx={{ height: 40, width: 40 }}
                        >
                            {item.icon}
                        </Fab>
                    </Box>
                )
            )}
        </BottomNavigation>
    );
};

export default BottomNav;
