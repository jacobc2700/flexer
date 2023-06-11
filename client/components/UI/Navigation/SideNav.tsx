import AdbIcon from '@mui/icons-material/Adb';
import BusinessIcon from '@mui/icons-material/Business';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DataObjectIcon from '@mui/icons-material/DataObject';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import {
    Box,
    CSSObject,
    Divider,
    List,
    Drawer as MuiDrawer,
    IconButton as MuiIconButton,
    Theme,
    styled,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

import NavItem from './NavItem';

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

export default function MiniDrawer() {
    const theme = useTheme();
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
                <ViewSidebarIcon sx={{ transform: 'scale(-1)' }} />
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
                    <NavItem
                        icon={<HomeIcon />}
                        text='Home'
                        isCollapsed={!open}
                    />
                    <NavItem
                        icon={<LibraryBooksIcon />}
                        text='Notes'
                        isCollapsed={!open}
                    />
                    <NavItem
                        icon={<BusinessIcon />}
                        text='Companies'
                        isCollapsed={!open}
                    />
                    <NavItem
                        icon={<DataObjectIcon />}
                        text='Problems'
                        isCollapsed={!open}
                    />
                </List>
            </Drawer>
            {/* <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
            </Box> */}
        </Box>
    );
}
