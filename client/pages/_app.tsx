import SessionEmailLayout from '@/components/UI/Layouts/SessionEmailLayout';
import AppThemeProvider from '@/components/UI/Theme';
import { AppContextProvider } from '@/contexts/AppContext';
import { AuthContextProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import '@/styles/quill-custom.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <AuthContextProvider>
                <AppContextProvider>
                    <AppThemeProvider>
                        <SessionEmailLayout>
                            <Component {...pageProps} />
                        </SessionEmailLayout>
                    </AppThemeProvider>
                </AppContextProvider>
            </AuthContextProvider>
        </SessionProvider>
    );
}
