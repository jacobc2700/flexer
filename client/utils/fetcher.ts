import { ApiResponse } from '@/schema/ApiResponse.schema';

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ApiResponse> {
    try {
        // https://swr.vercel.app/docs/error-handling
        const res = await fetch(url, body);
        // TODO: validation that res is IApiResponse
        return await res.json();
    }
    catch (err) {
        console.log("fetcher error")
        console.log(err);
        throw new Error('Fetcher error')
    }
}
