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
import { useSession } from 'next-auth/react';
import { createContext, useState } from 'react';

interface IAppContext {
    notes: NotesData;
    companies: CompaniesData;
    problems: ProblemsData;
    myNotes: NotesData;
}

const defaultValues: IAppContext = {
    notes: [],
    companies: { favorites: [], companies: [] },
    problems: { favorites: [], problems: [] },
    myNotes: [],
};

/**
 * Context for storing public data.
 */
const AppContext = createContext<IAppContext>(defaultValues);

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const AppContextProvider: React.FC<IProps> = (props) => {
    const { status } = useSession();

    const { data: notes } = useData<IAppContext['notes']>(
        '/notes/explore',
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

    const { data: myNotes } = useData<IAppContext['notes']>(
        '/notes',
        NotesDataSchema,
        { revalidateOnFocus: false },
        status === 'authenticated'
    );

    return (
        <AppContext.Provider
            value={{
                notes: notes ?? defaultValues.notes,
                problems: problems ?? defaultValues.problems,
                companies: companies ?? defaultValues.companies,
                myNotes: myNotes ?? defaultValues.myNotes,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
