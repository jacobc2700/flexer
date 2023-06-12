import BusinessIcon from '@mui/icons-material/Business';
import DataObjectIcon from '@mui/icons-material/DataObject';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Avatar, Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

import BottomNav from '../Navigation/BottomNav';
import SideNav from '../Navigation/SideNav';

export type navItem = {
    href: string;
    icon: JSX.Element;
    title: string;
};

interface IProps {
    children?: React.ReactNode;
}

const NAV_HEIGHT = 56; // px

const navItems: navItem[] = [
    {
        href: '/home',
        icon: <HomeIcon />,
        title: 'Home',
    },
    {
        href: '/notes',
        icon: <LibraryBooksIcon />,
        title: 'Notes',
    },
    {
        href: '/profile',
        icon: (
            <Avatar
                alt='Remy Sharp'
                src='https://picsum.photos/seed/picsum/200'
                sx={{ border: '2px solid #fff' }}
            />
        ),
        title: 'Profile',
    },
    {
        href: '/companies',
        icon: <BusinessIcon />,
        title: 'Companies',
    },
    {
        href: '/problems',
        icon: <DataObjectIcon />,
        title: 'Problems',
    },
];

const NavigationLayout: React.FC<IProps> = (props) => {
    const theme = useTheme();
    const isMobileQuery = useMediaQuery(theme.breakpoints.down('sm'));

    const [activeNav, setActiveNav] = useState(0);

    const updateActiveNav = (navIdx: number) => setActiveNav(navIdx);

    return (
        <Box>
            {isMobileQuery && (
                <>
                    <Box sx={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
                        {props.children}
                    </Box>
                    <BottomNav
                        navHeight={NAV_HEIGHT}
                        navItems={navItems}
                        updateActiveNav={updateActiveNav}
                        activeNav={activeNav}
                    />
                </>
            )}
            {!isMobileQuery && (
                <SideNav
                    navItems={navItems}
                    updateActiveNav={updateActiveNav}
                    activeNav={activeNav}
                >
                    {props.children}
                </SideNav>
            )}
        </Box>
    );
};

export default NavigationLayout;
