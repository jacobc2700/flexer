import {
    Adapter,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from 'next-auth/adapters';

import Validate from './validate';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TODO: make this file more organized
export function format<T>(obj: Record<string, any>): T {
    for (const [key, value] of Object.entries(obj)) {
        if (Validate.isNullish(value)) {
            delete obj[key];
        }

        if (Validate.isString(value) && Validate.isDateString(value)) {
            obj[key] = new Date(value);
        }
    }

    return obj as T;
}

// delet eit later
function makeid(length: number) {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

// TODO: validate, return proper errors.
const ServerAdapter = (): Adapter => {
    return {
        // same problem as updateUser, needs body
        async createUser(user) {
            const rawResp = await fetch(`${BASE_URL}/users/`, {
                method: 'POST',
                body: JSON.stringify({
                    ...user,
                    password: 'Aj203axmcoalwd_',
                    username: makeid(10),
                    first_name: 'bing',
                    last_name: 'bong',
                }),
            });
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterUserWithDateString(fields)) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified
                            ? new Date(fields.emailVerified)
                            : null,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('TEMP: create user failed');
        },
        async getUser(user_id) {
            const rawResp = await fetch(`${BASE_URL}/auth/id/${user_id}`);
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterUserWithDateString(fields)) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified
                            ? new Date(fields.emailVerified)
                            : null,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            return null;
        },
        async getUserByEmail(email_address) {
            const rawResp = await fetch(
                `${BASE_URL}/auth/email-address/${email_address}`
            );
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterUserWithDateString(fields)) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified
                            ? new Date(fields.emailVerified)
                            : null,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            return null;
        },
        // (${BASE_URL}/auth/5038bdc3-1d93-470c-a3bf-f57e8558762d)
        async getUserByAccount({ providerAccountId, provider }) {
            const rawResp = await fetch(
                `${BASE_URL}/auth/getUserByAccount/${provider}/${providerAccountId}`
            );
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterUserWithDateString(fields)) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified
                            ? new Date(fields.emailVerified)
                            : null,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            return null;
        },
        // TODO: pass rest of body (figure out how to add more fields to the adapter user or find some other way to add more fields)
        async updateUser(user) {
            const rawResp = await fetch(`${BASE_URL}/users/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...user,
                    // TEMP: randomly generates a new username for now.
                    username: Math.floor(Math.random() * 10000).toString(),
                }),
            });
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterUserWithDateString(fields)) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified
                            ? new Date(fields.emailVerified)
                            : null,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('TEMP: update user failed');
        },
        async deleteUser(userId) {
            // currently not used by next-auth
            const rawResp = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            });
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterUserWithDateString(fields)) {
                    const filteredFields: AdapterUser = {
                        id: fields.id,
                        email: fields.email,
                        emailVerified: fields.emailVerified
                            ? new Date(fields.emailVerified)
                            : null,
                    };

                    return format<AdapterUser>(filteredFields);
                }
            }

            throw Error('TEMP: delete user failed');
        },

        async linkAccount(account) {
            const rawResp = await fetch(`${BASE_URL}/auth/linkAccount`, {
                method: 'POST',
                body: JSON.stringify(account),
            });
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterAccount(fields)) return;
            }

            throw Error('TEMP: link account failed');
        },
        async unlinkAccount({ providerAccountId, provider }) {
            // currently not used by next-auth
            const rawResp = await fetch(`${BASE_URL}/auth/unlinkAccount`, {
                method: 'DELETE',
                body: JSON.stringify({
                    provider,
                    providerAccountId,
                }),
            });

            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;
                if (Validate.isAdapterAccount(fields)) return;
            }

            throw Error('TEMP: unlink account failed');
        },
        async createSession({ sessionToken, userId, expires }) {
            const rawResp = await fetch(`${BASE_URL}/auth/session`, {
                method: 'POST',
                body: JSON.stringify({
                    sessionToken: sessionToken,
                    userId: userId,
                    expires: expires,
                }),
            });

            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterSessionWithDateString(fields)) {
                    const filteredFields: AdapterSession = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: new Date(fields.expires),
                    };

                    return format<AdapterSession>(filteredFields);
                }
            }

            throw Error('TEMP: create session failed');
        },
        async getSessionAndUser(sessionToken) {
            const rawResp = await fetch(
                `${BASE_URL}/auth/session/${sessionToken}`
            );
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;
                let userFilteredFields: AdapterUser | null = null;
                let sessionFilteredFields: AdapterSession | null = null;
                if (
                    Validate.isNotNullish(fields) &&
                    'users' in fields &&
                    Validate.isAdapterUserWithDateString(fields.users)
                ) {
                    userFilteredFields = {
                        id: fields.users.id,
                        email: fields.users.email,
                        emailVerified: fields.users.emailVerified
                            ? new Date(fields.users.emailVerified)
                            : null,
                    };
                }

                if (Validate.isAdapterSessionWithDateString(fields)) {
                    sessionFilteredFields = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: new Date(fields.expires),
                    };
                }

                if (
                    Validate.isNotNullish(userFilteredFields) &&
                    Validate.isNotNullish(sessionFilteredFields)
                ) {
                    return {
                        user: format<AdapterUser>(userFilteredFields),
                        session: format<AdapterSession>(sessionFilteredFields),
                    };
                }
            }

            return null;
        },
        async updateSession(session) {
            const rawResp = await fetch(
                `${BASE_URL}/auth/session/${session.sessionToken}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        userId: session.userId,
                        expires: session.expires,
                    }),
                }
            );

            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterSessionWithDateString(fields)) {
                    const filteredFields: AdapterSession = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: new Date(fields.expires),
                    };

                    return format<AdapterSession>(filteredFields);
                }
            }

            throw Error('TEMP: update session failed');
        },
        async deleteSession(sessionToken) {
            const rawResp = await fetch(
                `${BASE_URL}/auth/session/${sessionToken}`,
                {
                    method: 'DELETE',
                }
            );

            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isAdapterSessionWithDateString(fields)) {
                    const filteredFields: AdapterSession = {
                        sessionToken: fields.sessionToken,
                        userId: fields.userId,
                        expires: new Date(fields.expires),
                    };

                    return format<AdapterSession>(filteredFields);
                }
            }

            throw Error('TEMP: delete session failed');
        },
        async createVerificationToken(token) {
            const rawResp = await fetch(`${BASE_URL}/auth/token`, {
                method: 'POST',
                body: JSON.stringify(token),
            });
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isVerificationTokenWithDateString(fields)) {
                    const tokenFields: VerificationToken = {
                        identifier: fields.identifier,
                        expires: new Date(fields.expires),
                        token: fields.token,
                    };

                    return format<VerificationToken>(tokenFields);
                }
            }

            throw Error('TEMP: create verification token failed');
        },
        async useVerificationToken({ identifier, token }) {
            const rawResp = await fetch(`${BASE_URL}/auth/token`, {
                method: 'DELETE',
                body: JSON.stringify({
                    identifier: identifier,
                    token: token,
                }),
            });
            const resp: unknown = await rawResp.json();

            if (Validate.isValidResponse(resp) && Validate.isResponseOk(resp)) {
                const fields = resp.data;

                if (Validate.isVerificationTokenWithDateString(fields)) {
                    const tokenFields: VerificationToken = {
                        identifier: fields.identifier,
                        expires: new Date(fields.expires),
                        token: fields.token,
                    };

                    return format<VerificationToken>(tokenFields);
                }
            }

            throw Error('TEMP: use verification token failed');
        },
    };
};

export default ServerAdapter;
