// Some URLs work without a slash at the end, while some do.
import useData from '@/hooks/useData';
import CompanyPreviewSchema, {
    CompanyPreview,
} from '@/schema/CompanyPreview.schema';
import NoteSchema, { Note } from '@/schema/Note.schema';
import ProblemSchema, { Problem } from '@/schema/Problem.schema';
import { createContext, useState } from 'react';
import { z } from 'zod';

interface IAppContext {
    notes: Note[];
    companies: {
        favorites: { company_id: string }[];
        companies: CompanyPreview[];
    };
    problems: Problem[];
    updateUsername: (username: string) => void;
}

const defaultValues: IAppContext = {
    notes: [],
    companies: { favorites: [], companies: [] },
    problems: [],
    updateUsername: () => ({}),
};

const AppContext = createContext<IAppContext>(defaultValues);

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [username, setUsername] = useState<string>('');

    // TODO:
    // const [userNotes, setUserNotes] = useState<unknown[]>([]); //private notes for user

    const updateUsername = (newUsername: string) => {
        if (newUsername === '') return;
        setUsername(newUsername);
    };

    const { data: notes } = useData<IAppContext['notes']>('/notes/', NoteSchema.array(), {
        revalidateOnFocus: false,
    });

    const { data: problems } = useData<IAppContext['problems']>(
        '/problems/',
        ProblemSchema.array(),
        { revalidateOnFocus: false }
    );

    const { data: companies } = useData<IAppContext['companies']>(
        '/companies/',
        z.object({
            favorites: z.array(z.object({ company_id: z.string().uuid() })),
            companies: CompanyPreviewSchema.array(),
        }),
        { revalidateOnFocus: false }
    );

    return (
        <AppContext.Provider
            value={{
                notes: notes ?? defaultValues.notes,
                problems: problems ?? defaultValues.problems,
                companies: companies ?? defaultValues.companies,
                updateUsername,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
