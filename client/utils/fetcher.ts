// import { ApiResponse } from '@/schema/ApiResponse.schema';
// export default async function fetcher(
//     url: RequestInfo,
//     body?: RequestInit
// ): Promise<ApiResponse> {
//     try {
//         // https://swr.vercel.app/docs/error-handling
//         const res = await fetch(url, {
//             ...body,
//             credentials: 'include',
//         });
//         // TODO: validation that res is IApiResponse
//         return await res.json();
//     } catch (err) {
//         console.log('fetcher error');
//         console.log(err);
//         throw new Error('Fetcher error');
//     }
// }
import { ApiResponse } from '@/schema/ApiResponse.schema';

export default async function fetcher(
    url: RequestInfo,
    body?: RequestInit
): Promise<ApiResponse> {
    try {
        // https://swr.vercel.app/docs/error-handling
        const res = await fetch('http://localhost:3000/api/gateway', {
            method: 'POST',
            body: JSON.stringify({ url, body }),
        });
        // TODO: validation that res is IApiResponse
        return await res.json();    
    } catch (err) {
        console.log('fetcher error');
        console.log(err);
        throw new Error('Fetcher error');
    }
}
