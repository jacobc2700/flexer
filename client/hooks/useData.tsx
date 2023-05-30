import { ApiResponse } from '@/schema/ApiResponse.schema';
import fetcher from '@/utils/fetcher';
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr';
import z from 'zod';

/**
 * Custom hook to make request to API using SWR (should only be used for GET requests). 
 * @param path localhost:8000[/path] (include leading slash)
 * @param DataSchema a zod schema
 * @param options SWR options object
 * @param shouldCallApi makes request when true
 * @returns 
 */
const useData = <T,>(
    path: string,
    DataSchema: z.ZodType,
    options?: SWRConfiguration,
    shouldCallApi?: boolean
): {
    data?: T;
    isLoading: boolean;
    isError: string;
    mutate: KeyedMutator<ApiResponse>;
} => {
    const { data, error, mutate } = useSWR(
        shouldCallApi || shouldCallApi === undefined
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`
            : null,
        fetcher,
        options
    );

    let validatedData: T | undefined = undefined;
    console.log(data);
    if (data !== undefined) {
        if (data.ok === true) {
            const parse = DataSchema.safeParse(data.data);
            if (!parse.success) {
                console.log(parse.error);
                throw new Error(
                    "DEBUG (useData.tsx): Data object doesn't match schema. "
                );
            }

            validatedData = parse.data;
        }
        else {
            throw new Error('DEBUG (useData.tsx): API response is not ok. ');
        }
    }

    return {
        data: validatedData,
        isLoading: !error && !data,
        isError: error?.statusText,
        mutate,
    };
};

export default useData;
