// Some URLs work without a slash at the end, while some do.
import useData from '@/hooks/useData';
import {
    CompaniesData,
    CompaniesDataSchema,
    NotesData,
    NotesDataSchema,
    ProblemsData,
    ProblemsDataSchema,
} from '@/schema/ApiData.schema';
import CompanyPreviewSchema from '@/schema/CompanyPreview.schema';
import NoteSchema, { Note } from '@/schema/Note.schema';
import ProblemSchema, { Problem } from '@/schema/Problem.schema';
import { createContext, useState } from 'react';
import { z } from 'zod';

interface IAppContext {
    notes: NotesData;
    companies: CompaniesData;
    problems: ProblemsData;
    updateUsername: (username: string) => void;
}

const defaultValues: IAppContext = {
    notes: [],
    companies: { favorites: [], companies: [] },
    problems: { favorites: [], problems: [] },
    updateUsername: () => ({}),
};

const AppContext = createContext<IAppContext>(defaultValues);

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [username, setUsername] = useState<string>('');

    const updateUsername = (newUsername: string) => {
        if (newUsername === '') return;
        setUsername(newUsername);
    };

    const { data: notes } = useData<IAppContext['notes']>(
        '/notes/',
        NotesDataSchema,
        { revalidateOnFocus: false }
    );

    const { data: problems } = useData<IAppContext['problems']>(
        '/problems/',
        ProblemsDataSchema,
        { revalidateOnFocus: false }
    );

    const { data: companies } = useData<IAppContext['companies']>(
        '/companies/',
        CompaniesDataSchema,
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
