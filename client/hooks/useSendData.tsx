import { ApiResponseOk } from '@/schema/ApiResponse.schema';
import fetcher from '@/utils/fetcher';
import { useState } from 'react';
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr';
import z from 'zod';

/**
 * Custom hook to update records in the database through the API.
 * @param path localhost:8000[/path] (include leading slash)
 * @param method 'POST' | 'PUT' | 'DELETE' | 'PATCH'
 * @returns
 */
const useSendData = <T extends Record<string, unknown>,>(
    path: string,
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
): {
    executeRequest: (requestBody?: T) => Promise<void>;
    isLoading: boolean;
    isError: string;
} => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const executeRequest = async (requestBody?: T) => {
        setIsLoading(true);
        setError('');

        try {
            const resp = await fetcher(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
                { method, body: JSON.stringify(requestBody) }
            );

            console.log(resp);
            if (resp !== undefined) {
                if (resp.ok === false) {
                    throw new Error(
                        'DEBUG (useData.tsx): API response is not ok.'
                    );
                }
            }
        } catch (err) {
            setError(String(err));
        }

        setIsLoading(false);
    };

    return {
        executeRequest,
        isLoading: isLoading,
        isError: error,
    };
};

export default useSendData;
