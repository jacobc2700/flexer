// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = unknown;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { url, body } = JSON.parse(req.body);

    const cookies = req.cookies;
    const sessionTok = cookies['next-auth.session-token'];

    const resp = await fetch(url, {
        ...body,
        headers: { Cookie: `session-token=${sessionTok ?? ''}` },
    });
    const jsonResp = await resp.json();

    res.json(jsonResp);
}
