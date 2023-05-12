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
        const parse1 = ApiResponseOkSchema.safeParse(data);
        if (!parse1.success) {
            console.log(parse1.error);
            throw new Error('DEBUG (useData.tsx): API response is not ok. ');
        }

        const parse2 = DataSchema.safeParse(parse1.data.data);
        if (!parse2.success) {
            console.log(parse2.error);
            throw new Error(
                "DEBUG (useData.tsx): Data object doesn't match schema. "
            );
        }

        validatedData = parse2.data;
    }

    return {
        data: validatedData,
        isLoading: !error && !data,
        isError: error?.statusText,
        mutate,
    };
};

export default useData;
