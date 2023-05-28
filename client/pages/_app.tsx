// import '@/styles/globals.css';
import AppThemeProvider from '@/components/UI/Theme';
import { AppContextProvider } from '@/contexts/AppContext';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <AuthContextProvider>
                <AppContextProvider>
                    <AppThemeProvider>
                        <Component {...pageProps} />
                    </AppThemeProvider>
                </AppContextProvider>
            </AuthContextProvider>
        </SessionProvider>
    );
}
