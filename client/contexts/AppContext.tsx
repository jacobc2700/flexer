// Some URLs work without a slash at the end, while some do.
import fetcher from '@/utils/fetcher';
import Validate from '@/utils/validate';
import React, { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

interface IAppContext {
    notes: unknown[];
    companies: unknown[];
    problems: unknown[];
}

const defaultValues: IAppContext = {
    notes: [],
    companies: [],
    problems: [],
};

const AppContext = createContext<IAppContext>(defaultValues);

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const AppContextProvider: React.FC<IProps> = (props) => {
    const [notes, setNotes] = useState<unknown[]>([]);
    const [problems, setProblems] = useState<unknown[]>([]);
    const [companies, setCompanies] = useState<unknown[]>([]);

    // companies, problems, users,

    // const { data: notesResp } = useSWR(
    //     'http://localhost:8000/users/bingbong/notes',
    //     fetcher
    // );

    // useEffect(() => {
    //     // do error handling and load state.
    //     if (
    //         Validate.isValidResponse(notesResp) &&
    //         Validate.isResponseOk(notesResp)
    //     ) {
    //         const fields = notesResp.data as unknown[];
    //         setNotes(fields);
    //     }
    // }, [notesResp]);

    // const { data: problemsResp } = useSWR(
    //     'http://localhost:8000/problems/',
    //     fetcher
    // );

    // useEffect(() => {
    //     // do error handling and load state.
    //     if (
    //         Validate.isValidResponse(problemsResp) &&
    //         Validate.isResponseOk(problemsResp)
    //     ) {
    //         const fields = problemsResp.data as unknown[];
    //         setProblems(fields);
    //     }
    // }, [problemsResp]);

    // // COMPNAIES
    // const { data: companiesResp } = useSWR(
    //     'http://localhost:8000/companies/',
    //     fetcher
    // );

    // useEffect(() => {
    //     // do error handling and load state.
    //     if (
    //         Validate.isValidResponse(companiesResp) &&
    //         Validate.isResponseOk(companiesResp)
    //     ) {
    //         const fields = companiesResp.data as unknown[];
    //         setCompanies(fields);

    //         // if (Validate.isAdapterAccount(fields)) return;
    //     }
    // }, [companiesResp]);

    // do whatever in here
    // API calls

    return (
        <AppContext.Provider value={{ notes, problems, companies }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
