// import '@/styles/globals.css';
import AppThemeProvider from '@/components/UI/Theme';
import { AppContextProvider } from '@/contexts/AppContext';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <AppContextProvider>
                <AppThemeProvider>
                    <Component {...pageProps} />
                </AppThemeProvider>
            </AppContextProvider>
        </SessionProvider>
    );
}
