import {
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken
} from 'next-auth/adapters';

import { ApiResponseType, IResponseError, IResponseOk } from '../types';

export default class Validate {
    static isNullish(data: unknown): data is undefined | null {
        return data === undefined || data === null;
    }

    static isNotNullish<T>(data: unknown): data is NonNullable<T> {
        return data !== undefined && data !== null;
    }

    static isString(data: unknown): data is string {
        return typeof data === 'string';
    }

    static isBoolean(data: unknown): data is boolean {
        return typeof data === 'boolean';
    }

    static isNumber(data: unknown): data is number {
        return typeof data === 'number';
    }

    static isRecord(data: unknown): data is Record<string, unknown> {
        return (
            Validate.isNotNullish(data) &&
            typeof data === 'object' &&
            !Validate.isArray(data)
        );
    }

    static isArray<T>(data: unknown): data is Array<T> {
        return Array.isArray(data);
    }

    static isValidResponse(data: unknown): data is ApiResponseType {
        return (
            Validate.isRecord(data) &&
            'ok' in data &&
            'status' in data &&
            'message' in data &&
            'data' in data &&
            Validate.isBoolean(data.ok) &&
            Validate.isNumber(data.status) &&
            Validate.isString(data.message)
        );
    }

    static isResponseOk(data: ApiResponseType): data is IResponseOk {
        return data.ok === true;
    }

    static isResponseError(data: ApiResponseType): data is IResponseError {
        return data.ok === false;
    }

    static isDateString(str: string): boolean {
        const date = new Date(str);
        return date.toString() !== 'Invalid Date' && !isNaN(Date.parse(str));
    }

    static isAdapterUserWithDateString(
        data: unknown
    ): data is Omit<AdapterUser, 'emailVerified'> & {
        emailVerified: string | null;
    } {
        return (
            Validate.isRecord(data) &&
            'id' in data &&
            'email' in data &&
            'emailVerified' in data &&
            Validate.isString(data.id) &&
            Validate.isString(data.email) &&
            (Validate.isNullish(data.emailVerified) ||
                (Validate.isString(data.emailVerified) &&
                    Validate.isDateString(data.emailVerified)))
        );
    }

    //   id: 'f5ebb166-ae2e-4d68-b5ac-d360644e58d5',
    //   type: 'oauth',
    //   provider: 'google',
    //   providerAccountId: '100745420979271670833',
    //   refresh_token: null,
    //   access_token: 'ya29.a0AVvZVsrpylBl4pi37rwiIsA2FpRdbjG1t-6R_EEsr4aAS0Al8eo0r9ftXygKdtwvDz1Rw2IY86VS3ely3RYbV4LE9WbIRL9PCn5tIv9dCjhJTy7_7WVP3Akgo3G0cNd2T9gKwmIhDmmfu8fRWGEZlgQl3lWFaCgYKAZ8SARASFQGbdwaID6BDdrzXkUDdknRxLdCcVg0163',
    //   expires_at: 1679286338,
    //   token_type: 'Bearer',
    //   scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
    //   id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4NmVlOWEzYjc1MjBiNDk0ZGY1NGZlMzJlM2U1YzRjYTY4NWM4OWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MTYwNjIyOTI4ODctOGY0aXU2azI5NnI4YTRxMTB2cWhlMG9mcmYxZWd0ZGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MTYwNjIyOTI4ODctOGY0aXU2azI5NnI4YTRxMTB2cWhlMG9mcmYxZWd0ZGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA3NDU0MjA5NzkyNzE2NzA4MzMiLCJlbWFpbCI6ImFuZHJld3pobGVlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQjlNVlExbkVLMWg2YVRlTXZXOXI0ZyIsIm5hbWUiOiJBbmRyZXcgTGVlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFpMTElxcGVUYXRBTHVYaDJhVzBORGtMemtkcDZmYkVBa3ZzWGYzPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFuZHJldyIsImZhbWlseV9uYW1lIjoiTGVlIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2NzkyODI3NDAsImV4cCI6MTY3OTI4NjM0MH0.aVHz9Iyh0BSq80U3gJboyUMBtPuRXXcMwR4k7vv4xqU6SmHPX7vsBnw2oaSPQRpwqQCSX2JuSYltDPQDzjmINsgvCdzap0hid17m27eSuHxCjuh9MkzfiLGsP4nmWwWGLRPE7h43MNDf8Ob9zK3-NVFEXePePncgmAHFQDHmf1vU4KNWTtLuJ__fxbvSqj4vG6nWukrGiB8HpG_YMYpDGT3kIQf-HSvVh6YzZ18Rl1G1dAqi6GPStS_JgvX81OhhoXH8AbpKiHODNT7p0HvQLm1y2B7ilDHNWU3wKIAt7-Z_06dGKZjABkuThFVJTnqaWTG40PJroo14bezLK__b3A',
    //   session_state: null,
    //   oauth_token_secret: null,
    //   oauth_token: null,
    //   userId: '6ece3765-64c8-4b96-b685-2ee5d636127e'

    static isAdapterAccount(data: unknown): data is AdapterAccount {
        return (
            Validate.isRecord(data) &&
            'userId' in data &&
            'type' in data &&
            'provider' in data &&
            'providerAccountId' in data &&
            'refresh_token' in data &&
            'access_token' in data &&
            'expires_at' in data &&
            'token_type' in data &&
            'scope' in data &&
            'id_token' in data &&
            'session_state' in data &&
            'oauth_token_secret' in data &&
            'oauth_token' in data
            // &&
            // Validate.isString(data.userId) &&
            // Validate.isString(data.type) &&
            // Validate.isString(data.provider) &&
            // Validate.isString(data.providerAccountId) &&
            // (Validate.isString(data.refresh_token) ||
            //     Validate.isNullish(data.refresh_token)) &&
            // (Validate.isString(data.access_token) ||
            //     Validate.isNullish(data.access_token)) &&
            // (Validate.isString(data.expires_at) ||
            //     Validate.isNullish(data.expires_at)) &&
            // (Validate.isString(data.token_type) ||
            //     Validate.isNullish(data.token_type)) &&
            // (Validate.isString(data.scope) || Validate.isNullish(data.scope)) &&
            // (Validate.isString(data.id_token) ||
            //     Validate.isNullish(data.id_token)) &&
            // (Validate.isString(data.session_state) ||
            //     Validate.isNullish(data.session_state)) &&
            // (Validate.isString(data.oauth_token_secret) ||
            //     Validate.isNullish(data.oauth_token_secret)) &&
            // (Validate.isString(data.oauth_token) ||
            //     Validate.isNullish(data.oauth_token))
        );
    }

    static isAdapterSessionWithDateString(
        data: unknown
    ): data is Omit<AdapterSession, 'expires'> & { expires: string } {
        return (
            Validate.isRecord(data) &&
            'sessionToken' in data &&
            'userId' in data &&
            'expires' in data &&
            Validate.isString(data.sessionToken) &&
            Validate.isString(data.userId) &&
            Validate.isString(data.expires) &&
            Validate.isDateString(data.expires)
        );
    }

    static isVerificationTokenWithDateString(
        data: unknown
    ): data is Omit<VerificationToken, 'expires'> & { expires: string } {
        return (
            Validate.isRecord(data) &&
            'expires' in data &&
            'identifier' in data &&
            'token' in data &&
            Validate.isString(data.expires) &&
            Validate.isString(data.identifier) &&
            Validate.isString(data.token)
        );
    }
}
