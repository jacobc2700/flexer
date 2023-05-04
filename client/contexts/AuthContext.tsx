// Some URLs work without a slash at the end, while some do.
import {useState, createContext, useEffect} from 'react';
import UserSchema, { User } from '@/schema/User.schema';
import useData from '@/hooks/useData';

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
        `http://localhost:8000/auth/email-address/${email}`,
        UserSchema,
        { revalidateOnFocus: false },
        email !== null,
    );

    const updateEmail = (newEmail: string) => {
        if (email === newEmail) return;
        setEmail(String(newEmail));
    };

    return (
        <AuthContext.Provider value={{ user, updateEmail }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
