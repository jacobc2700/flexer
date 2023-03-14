import {
    Adapter,
    AdapterSession,
    AdapterUser,
    VerificationToken
} from 'next-auth/adapters';

import { Database } from './database.types';

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

export const ServerAdapter = ({
    url,
    secret,
}: {
    url: string;
    secret: string;
}): Adapter => {
    return {
        async createUser(user) {
            return format<AdapterUser>({});
        },
        async getUser(id) {
            return format<AdapterUser>({});
        },
        async getUserByEmail(email) {
            return format<AdapterUser>({});
        },
        async getUserByAccount({ providerAccountId, provider }) {
            return format<AdapterUser>({});
        },
        async updateUser(user) {
            return format<AdapterUser>({});
        },
        async deleteUser(userId) {
            return;
        },
        async linkAccount(account) {
            return;
        },
        async unlinkAccount({ providerAccountId, provider }) {
            return;
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
