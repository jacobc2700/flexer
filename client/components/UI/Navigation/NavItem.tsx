import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { navItem } from '../Layouts/NavigationLayout';

interface IProps {
    navItem: navItem;
    isCollapsed: boolean;
    isActive: boolean;
    updateActiveNav: () => void;
}

const NavItem: React.FC<IProps> = (props) => {
    return (
        <ListItem
            key={props.navItem.title}
            disablePadding
            sx={{ display: 'block' }}
        >
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: !props.isCollapsed ? 'initial' : 'center',
                    px: 2.5,
                }}
                selected={props.isActive}
                onClick={props.updateActiveNav}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: !props.isCollapsed ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {props.navItem.icon}
                </ListItemIcon>
                <ListItemText
                    primary={props.navItem.title}
                    sx={{ opacity: !props.isCollapsed ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default NavItem;
