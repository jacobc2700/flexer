// import assert from 'assert';

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

    static doFieldsExist<T extends Record<string, unknown>, IFields>(
        data: T
    ): data is T & IFields {
        return true;
    }
}

// export const ValidateTest = (x: unknown) => {
//     // if (Validate.isArrayEmpty<number[]>(x)) {
//     // console.log(x[0]);
//     // }

//     const fields = ['a', 'b', 'c'];
//     type xdsf = keyof fields;
//     console.log(f);
// };
