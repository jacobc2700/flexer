// Some URLs work without a slash at the end, while some do.
import { IUser } from '@/types';
import fetcher from '@/utils/fetcher';
import Validate from '@/utils/validate';
import React, { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

interface IAppContext {
    user: IUser | null;
    updateEmail: (email: string) => void;
}

const defaultValues: IAppContext = {
    user: null,
    updateEmail: () => ({}),
};

const AuthContext = createContext<IAppContext>(defaultValues);

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const AuthContextProvider: React.FC<IProps> = (props) => {
    const [email, setEmail] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(defaultValues.user);

    const { data: userResp } = useSWR(
        email ? `http://localhost:8000/auth/email-address/${email}` : null,
        fetcher,
        { revalidateOnFocus: false}
    );

    const updateEmail = (newEmail: string) => {
        if (email === newEmail) return;
        console.log(newEmail);
        setEmail(String(newEmail));
    };

    useEffect(() => {
        if (
            Validate.isValidResponse(userResp) &&
            Validate.isResponseOk(userResp) &&
            Validate.isNotNullish(userResp)
        )
            // TODO: unsafe
            setUser(userResp.data as IUser)
    }, [userResp]);

    return (
        <AuthContext.Provider value={{ user, updateEmail }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
