import { Box, useMediaQuery, useTheme } from '@mui/material';

import BottomNav from './BottomNav';

interface IProps {
    children?: React.ReactNode;
}

const NAV_HEIGHT = 56; // px

const Navigation: React.FC<IProps> = (props) => {
    const theme = useTheme();
    const isMobileQuery = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            {isMobileQuery && (
                <>
                    <Box
                        sx={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}
                    >
                        {props.children}
                    </Box>
                    <BottomNav navHeight={NAV_HEIGHT} />
                </>
            )}
            {!isMobileQuery && <div>DESKTOP NAV</div>}
        </Box>
    );
};

export default Navigation;
