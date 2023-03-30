/**
 * Not categorized yet
 */

export interface ICompany {
    id: string;
    name: string;
    reviews: number;
    salary: number;
}

/**
 * API Response Types
 */

export type ApiResponseType = IResponseOk | IResponseError;

export interface IResponseOk {
    ok: true;
    status: number;
    message: string;
    data: unknown;
}

export interface IResponseError {
    ok: false;
    status: number;
    message: string;
    data: unknown;
}
