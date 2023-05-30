// Some URLs work without a slash at the end, while some do.
import useData from '@/hooks/useData';
import UserSchema, { User } from '@/schema/User.schema';
import { createContext, useEffect, useState } from 'react';

interface IAppContext {
    user: User | undefined;
    updateEmail: (email: string) => void;
}

const defaultValues: IAppContext = {
    user: undefined,
    updateEmail: () => ({}),
};

const AuthContext = createContext<IAppContext>(defaultValues);

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const AuthContextProvider: React.FC<IProps> = (props) => {
    const [email, setEmail] = useState<string | null>(null);

    const { data: user } = useData<User>(
        `/auth/email-address/${email}`,
        UserSchema,
        { revalidateOnFocus: false },
        email !== null
    );

    const updateEmail = (newEmail: string) => {
        if (email === newEmail || newEmail === null || newEmail === undefined)
            return;
        setEmail(String(newEmail));
    };

    return (
        <AuthContext.Provider value={{ user, updateEmail }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
