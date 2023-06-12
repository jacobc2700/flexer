import AdbIcon from '@mui/icons-material/Adb';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    Box,
    Button,
    CSSObject,
    Divider,
    List,
    Drawer as MuiDrawer,
    IconButton as MuiIconButton,
    Theme,
    styled,
} from '@mui/material';
import { useState } from 'react';

import { navItem } from '../Layouts/NavigationLayout';
import NavItem from './NavItem';

interface IProps {
    navItems: navItem[];
    activeNav: number;
    updateActiveNav: (navIdx: number) => void;
    children?: React.ReactNode;
}

const drawerWidthFull = 200; // px
const drawerWidthCollapsed = 65; // px

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidthFull,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidthFull,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    borderRadius: 4,
    backgroundColor: theme.palette.grey[900],
}));

const SideNav: React.FC<IProps> = (props) => {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', position: 'relative' }}>
            <IconButton
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                sx={{
                    position: 'absolute',
                    top: 12,
                    left: drawerWidthCollapsed + 8,
                    ...(open && { display: 'none' }),
                }}
            >
                <ChevronRightIcon
                    sx={{ zIndex: (theme) => theme.zIndex.drawer }}
                />
            </IconButton>
            <Drawer
                variant='permanent'
                open={open}
                PaperProps={{
                    sx: { backgroundColor: (theme) => theme.palette.grey[900] },
                }}
            >
                <DrawerHeader>
                    {/* Add Logo Here */}
                    <AdbIcon sx={{ m: 'auto' }} />
                    {open && (
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    )}
                </DrawerHeader>
                <Divider />
                <List>
                    {props.navItems.map((item, idx) =>
                        idx !== 2 ? (
                            <NavItem
                                key={item.title}
                                navItem={item}
                                isCollapsed={!open}
                                isActive={idx === props.activeNav}
                                updateActiveNav={() =>
                                    props.updateActiveNav(idx)
                                }
                            />
                        ) : null
                    )}
                </List>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 'auto',
                        mb: 1,
                    }}
                >
                    {open ? (
                        <Button
                            variant='outlined'
                            startIcon={props.navItems[2].icon}
                            sx={{
                                textTransform: 'none',
                                color: 'white',
                                borderColor: 'white',
                                px: 3,
                                fontSize: 16,
                                fontWeight: 400,
                                mx: 'auto',
                            }}
                        >
                            My Profile
                        </Button>
                    ) : (
                        props.navItems[2].icon
                    )}
                </Box>
            </Drawer>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                {props.children}
            </Box>
        </Box>
    );
};

export default SideNav;
