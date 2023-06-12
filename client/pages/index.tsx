import NavigationLayout from '@/components/UI/Layouts/NavigationLayout';
import { Button, Stack } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const QuickAccess = () => {
    return (
        <Stack>
            <Button onClick={() => signIn()}>signin</Button>
            <Button onClick={() => signOut()}>signout</Button>
            <Link href='/companies'>companies</Link>
            <Link href='/problems'>problems</Link>
            <Link href='/notes'>notes</Link>
            <Link href='/notes/new'>notepad</Link>
            <div>Index page (what should we put here?)</div>
        </Stack>
    );
};

export default function Index() {
    return (
        <NavigationLayout>
            <QuickAccess />
        </NavigationLayout>
    );
}
