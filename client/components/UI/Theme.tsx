import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });

declare module '@mui/material/styles' {
    interface Palette {
        paper: Palette['primary'];
    }

    interface PaletteOptions {
        paper?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6dc4eb',
        },
        secondary: {
            main: '#976bff',
        },
        paper: {
            main: 'rgba(255,255,255,0.05)',
            light: 'rgba(255,255,255,0.1)',
        },

        // primary, secondary, success, info, warning, error, text

        // muted: {
        //     main: grey[500],
        //     dark: grey[700],
        // },
        // divider: "rgba(255, 255, 255, 0.25)",
        // overlay: "rgba(255, 255, 255, 0.04)",
        // white: "#fff",
    },
    typography: {
        // Default font for <Typography /> component
        fontFamily: raleway.style.fontFamily,
    },
});

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const AppThemeProvider: React.FC<IProps> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline similar to normalize.css */}
            {/* Also forces app's background to be dark */}
            <CssBaseline />
            <div className={raleway.className}>{props.children}</div>
        </ThemeProvider>
    );
};

export default AppThemeProvider;
