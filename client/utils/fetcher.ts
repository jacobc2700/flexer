import { IApiResponse } from '@/types';

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ApiResponse> {
    try {
        const res = await fetch(url, body);
        return await res.json();
    }
    catch (err) {
        console.log("fetcher error")
        console.log(err);
        return {
            ok: false,
            status: 500,
            message: "fetcher.ts error",
            data: null
        };
    }
}
