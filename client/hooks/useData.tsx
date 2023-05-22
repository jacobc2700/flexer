import { ApiResponse, ApiResponseOkSchema } from '@/schema/ApiResponse.schema';
import fetcher from '@/utils/fetcher';
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr';
import z from 'zod';

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
