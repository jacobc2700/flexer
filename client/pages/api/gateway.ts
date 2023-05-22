// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Record<string, unknown>>
) {
    const { url, body } = JSON.parse(req.body);

    const cookies = req.cookies;
    const sessionTok = cookies['next-auth.session-token'];

    const resp = await fetch(url, {
        ...body,
        headers: { Cookie: `session-token=${sessionTok ?? ''}` },
    });

    try {
        const respJson = await resp.json();
        res.json(respJson);
    }
    catch (err) {
        console.error(err);
        res.json({});
    }
}
