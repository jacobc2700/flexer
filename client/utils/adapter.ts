import {
    Adapter,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from 'next-auth/adapters';

import { Database } from './database.types';
import Validate from './validate';

function isDate(date: any) {
    return (
        new Date(date).toString() !== 'Invalid Date' && !isNaN(Date.parse(date))
    );
}

// TODO: make this file more organized
export function format<T>(obj: Record<string, any>): T {
    for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
            delete obj[key];
        }

        if (isDate(value)) {
            obj[key] = new Date(value);
        }
    }

    return obj as T;
}

type ResponseType = IResponseOk | IResponseError;

interface IResponseOk {
    ok: true;
    status: number;
    message: string;
    data: Record<string, unknown>;
}

interface IResponseError {
    ok: false;
    status: number;
    message: string;
    data: null;
}

// TODO: validate, return proper errors.
const ServerAdapter = (): Adapter => {
    return {
        // same problem as updateUser, needs body
        async createUser(user) {
            return format<AdapterUser>({});
        },
        async getUser(user_id) {
            const resp = await fetch(
                `http://localhost:8000/auth/id/${user_id}`
            );
            const data: ResponseType = await resp.json();

            if (
                // data !== undefined &&
                // data !== null &&
                // 'ok' in data &&
                // data.ok === true &&
                // 'data' in data &&
                // Array.isArray(data.data) &&
                // data.data.length > 0

                Validate.isResponseOk(data) &&
                Validate.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    Validate.isRecord(fields) &&
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            return null;
        },
        async getUserByEmail(email_address) {
            const resp = await fetch(
                `http://localhost:8000/auth/email-address/${email_address}`
            );
            const data: ResponseType = await resp.json();

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            return null;
        },
        // (http://localhost:8000/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d)
        async getUserByAccount({ providerAccountId, provider }) {
            const resp = await fetch(
                `http://localhost:8000/auth/getUserByAccount/${provider}/${providerAccountId}`
            );
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'users' in fields &&
                    'id' in fields.users &&
                    'email' in fields.users &&
                    'emailVerified' in fields.users
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.users.id,
                        email: fields.users.email,
                        emailVerified: fields.users.emailVerified,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            return null;
        },
        // TODO: pass rest of body
        async updateUser(user) {
            const resp = await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...user,
                    email: 'joeys@gmail.com',
                    password: 'PASSWORD',
                    username: 'someuser',
                    first_name: 'f',
                    last_name: 'l',
                }),
            });
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('.');
            // return null;
        },
        async deleteUser(userId) {
            const resp = await fetch(`http://localhost:8000/users/${userId}`, {
                method: 'DELETE',
            });
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('.');
        },
        // same problem as the createUser, updateUser
        async linkAccount(account) {
            const resp = await fetch(`http://localhost:8000/auth/linkAccount`, {
                method: 'POST',
                body: JSON.stringify({
                    account: {
                        type: '1234231xc2435',
                        provider: 'abcdd2312s34123ddasdxcasddd',
                        providerAccountId: 'bcaxcxasdxcs4c123123',
                        userId: account.userId,
                    },
                }),
            });
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return;
                    // return format<AdapterUser>(filteredFields);
                }
            }

            // return format<AdapterUser>();
            throw Error('.');
            // return null;
        },
        async unlinkAccount({ providerAccountId, provider }) {
            const resp = await fetch(
                `http://localhost:8000/auth/unlink_account/${provider}/${providerAccountId}`,
                {
                    method: 'DELETE',
                }
            );

            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return;
                    // return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('.');
        },
        async createSession({ sessionToken, userId, expires }) {
            const resp = await fetch(`http://localhost:8000/auth/session`, {
                method: 'POST',
                body: JSON.stringify({
                    sessionToken: sessionToken,
                    userId: userId,
                    expires: expires,
                }),
            });

            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'sessionToken' in fields &&
                    'userId' in fields &&
                    'expires' in fields
                ) {
                    const filteredFields: AdapterSession = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: fields.expires,
                    };

                    // return;
                    return format<AdapterSession>(filteredFields);
                }
            }

            throw Error('.');
        },
        // returns <user, session>:
        async getSessionAndUser(sessionToken) {
            const resp = await fetch(
                `http://localhost:8000/auth/session/${sessionToken}`
            );
            const data: ResponseType = await resp.json();
            console.log(data);
            console.log('here');

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'users' in fields &&
                    'id' in fields.users &&
                    'email' in fields.users &&
                    'emailVerified' in fields.users &&
                    'sessionToken' in fields &&
                    'userId' in fields &&
                    'expires' in fields
                ) {
                    const userFilteredFields: AdapterUser = {
                        id: fields.users.id,
                        email: fields.users.email,
                        emailVerified: fields.users.emailVerified,
                    };

                    const sessionFilteredFields: AdapterSession = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: fields.expires,
                    };

                    return {
                        user: format<AdapterUser>(userFilteredFields),
                        session: format<AdapterSession>(sessionFilteredFields),
                    };
                    // return format<AdapterUser>(filteredFields);
                }
            }

            return null;
            // return {
            //     user: format<AdapterUser>(
            //         {} as Database['public']['Tables']['users']['Row']
            //     ),
            //     session: format<AdapterSession>({}),
            // };
        },
        // update session based on sessionToken, updating the userid, expires?
        async updateSession(session) {
            // const someDate: Date = new Date();
            // const blahDate: any = someDate - Math.random() * 1e12;
            const resp = await fetch(
                `http://localhost:8000/auth/session/${session.sessionToken}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: '5038bdc3-1d93-470c-a3bf-f57e8558762d',
                        expires: new Date(),
                    }),
                }
            );

            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'sessionToken' in fields &&
                    'userId' in fields &&
                    'expires' in fields
                ) {
                    const filteredFields: AdapterSession = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: fields.expires,
                    };

                    // return;
                    return format<AdapterSession>(filteredFields);
                }
            }

            throw Error('.');
        },
        async deleteSession(sessionToken) {
            const resp = await fetch(
                `http://localhost:8000/auth/session/${sessionToken}`,
                {
                    method: 'DELETE',
                }
            );
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'id' in fields &&
                    'email' in fields &&
                    'emailVerified' in fields
                ) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified,
                    };

                    return; // successfully deleted.
                    // return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('.');
        },
        async createVerificationToken(token) {
            const resp = await fetch(`http://localhost:8000/auth/token`, {
                method: 'POST',
                body: JSON.stringify({
                    token: {
                        identifier: token.identifier,
                        expires: token.expires,
                        token: token.token,
                    },
                }),
            });
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'identifier' in fields &&
                    'expires' in fields &&
                    'token' in fields
                ) {
                    const tokenFields: VerificationToken = {
                        identifier: fields.identifier,
                        expires: fields.expires,
                        token: fields.token,
                    };

                    // return;
                    return format<VerificationToken>(tokenFields);
                }
            }

            // return format<AdapterUser>();
            throw Error('.');
            // return null;
            // return format<VerificationToken>({});
        },
        async useVerificationToken({ identifier, token }) {
            const resp = await fetch(`http://localhost:8000/auth/token`, {
                method: 'DELETE',
                body: JSON.stringify({
                    // token: {
                    identifier: identifier,
                    token: token,
                    // },
                }),
            });
            const data: ResponseType = await resp.json();
            console.log(data);

            if (
                data !== undefined &&
                data !== null &&
                'ok' in data &&
                data.ok === true &&
                'data' in data &&
                Array.isArray(data.data) &&
                data.data.length > 0
            ) {
                const fields = data.data[0];

                if (
                    'identifier' in fields &&
                    'expires' in fields &&
                    'token' in fields
                ) {
                    const tokenFields: VerificationToken = {
                        identifier: fields.identifier,
                        expires: fields.expires,
                        token: fields.token,
                    };

                    // return;
                    return format<VerificationToken>(tokenFields);
                }
            }

            throw Error('.');
        },
    };
};

export default ServerAdapter;
