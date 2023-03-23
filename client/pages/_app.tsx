// import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import AppThemeProvider from '../components/UI/Theme';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <AppThemeProvider>
                <Component {...pageProps} />
            </AppThemeProvider>
        </SessionProvider>
    );
}
