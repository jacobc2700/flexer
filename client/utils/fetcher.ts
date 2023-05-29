import ApiResponseSchema, { ApiResponse } from '@/schema/ApiResponse.schema';

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ApiResponse> {
    try {
        const res = await fetch('http://localhost:3000/api/gateway', {
            method: 'POST',
            body: JSON.stringify({ url, body }),
        });

        // Check if fetch response conforms to API response schema.
        // response guaranteed to be JSON b/c of /gateway.
        const parse = ApiResponseSchema.safeParse(await res.json());
        if (!parse.success) {
            console.log(parse.error);
            throw new Error('Response does not conform to API response schema');
        }

        return parse.data;
    } catch (err) {
        console.error(err);
        return {
            ok: false,
            status: 400,
            data: null,
            message: 'Something went wrong.',
        };
    }
}
