import {
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken
} from 'next-auth/adapters';

import { IApiResponse, IResponseError, IResponseOk } from '../types';

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

    static isValidResponse(data: unknown): data is IApiResponse {
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

    static isResponseOk(data: IApiResponse): data is IResponseOk {
        return data.ok === true;
    }

    static isResponseError(data: IApiResponse): data is IResponseError {
        return data.ok === false;
    }

    static isDateString(str: string): boolean {
        const date = new Date(str);
        return date.toString() !== 'Invalid Date' && !isNaN(Date.parse(str));
    }

    static isAdapterUserWithDateString(data: unknown): data is Omit<
        AdapterUser,
        'emailVerified'
    > & {
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
            'oauth_token' in data &&
            Validate.isString(data.userId) &&
            Validate.isString(data.provider) &&
            Validate.isString(data.providerAccountId) &&
            Validate.isString(data.type) &&
            ['oauth', 'credentials', 'email'].includes(data.type) &&
            (Validate.isString(data.refresh_token) ||
                Validate.isNullish(data.refresh_token)) &&
            (Validate.isString(data.access_token) ||
                Validate.isNullish(data.access_token)) &&
            (Validate.isString(data.token_type) ||
                Validate.isNullish(data.token_type)) &&
            (Validate.isString(data.scope) || Validate.isNullish(data.scope)) &&
            (Validate.isString(data.id_token) ||
                Validate.isNullish(data.id_token)) &&
            (Validate.isString(data.session_state) ||
                Validate.isNullish(data.session_state)) &&
            (Validate.isString(data.oauth_token_secret) ||
                Validate.isNullish(data.oauth_token_secret)) &&
            (Validate.isString(data.oauth_token) ||
                Validate.isNullish(data.oauth_token)) &&
            (Validate.isNumber(data.expires_at) ||
                Validate.isNullish(data.expires_at))
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
            Validate.isDateString(data.expires) &&
            Validate.isString(data.identifier) &&
            Validate.isString(data.token)
        );
    }
}
