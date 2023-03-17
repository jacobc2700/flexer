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

// Response{
//     ok: bool,
//     status: int,
//     message: str,
//     data: any,
// }

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
            return;
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

                    return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('.');
        },
        async createSession({ sessionToken, userId, expires }) {
            return format<AdapterSession>({});
        },
        async getSessionAndUser(sessionToken) {
            return {
                user: format<AdapterUser>(
                    {} as Database['public']['Tables']['users']['Row']
                ),
                session: format<AdapterSession>({}),
            };
        },
        async updateSession(session) {
            return format<AdapterSession>({});
        },
        async deleteSession(sessionToken) {
            return;
        },
        async createVerificationToken(token) {
            return format<VerificationToken>({});
        },
        async useVerificationToken({ identifier, token }) {
            return format<VerificationToken>({});
        },
    };
};

export default ServerAdapter;
