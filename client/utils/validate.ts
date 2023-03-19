// import assert from 'assert';
import { AdapterUser } from 'next-auth/adapters';

// import { AssertionError } from 'assert'

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

export default class Validate {
    static isNullish<T>(data: unknown): data is NonNullable<T> {
        return data === undefined && data === null;
    }

    static isString(data: unknown): data is string {
        return typeof data === 'string';
    }

    static isRecord(data: unknown): data is Record<string, unknown> {
        return (
            !Validate.isNullish(data) &&
            typeof data === 'object' &&
            !Validate.isArray(data)
        );
    }

    static isArray<T>(data: unknown): data is Array<T> {
        return Array.isArray(data);
    }

    static isResponseOk(data: unknown): data is IResponseOk {
        return (
            Validate.isRecord(data) &&
            'ok' in data &&
            data.ok === true &&
            'status' in data &&
            'message' in data &&
            'data' in data
        );
    }

    static isDateString(str: string): boolean {
        const date = new Date(str);
        return date.toString() !== 'Invalid Date' && !isNaN(Date.parse(str));
    }

    static isAdapterUser(data: unknown): data is AdapterUser {
        return (
            Validate.isRecord(data) &&
            'id' in data &&
            'email' in data &&
            'emailVerified' in data &&
            Validate.isString(data.id) &&
            Validate.isString(data.email) &&
            Validate.isString(data.emailVerified) &&
            (Validate.isNullish(data.emailVerified) ||
                Validate.isDateString(data.emailVerified))
        );
    }
}
