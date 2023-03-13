import Companies from '../components/Companies/Companies';
import AppThemeProvider from '../components/UI/Theme';

export default function Home() {
    return (
        <AppThemeProvider>
            <Companies />
        </AppThemeProvider>
    );
}
