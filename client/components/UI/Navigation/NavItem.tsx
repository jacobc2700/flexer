import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface IProps {
    text: string;
    icon: JSX.Element;
    isCollapsed: boolean;
}

const NavItem: React.FC<IProps> = (props) => {
    return (
        <ListItem key={props.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: !props.isCollapsed ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: !props.isCollapsed ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.text} sx={{ opacity: !props.isCollapsed ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    );
};

export default NavItem;
