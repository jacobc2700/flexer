/**
 * Table Types
 */

type DateString = string;
type NoteType = "UNSPECIFIED" | "COMPANY" | "PROBLEM";
type VisibilityType = "PUBLIC" | "PRIVATE";
type ProblemDifficulty = 1 | 2 | 3;

// Viewing all companies
export interface ICompanyPreview {
    id: string;
    company_name: string;
    Reviews: number,
    Salary: number
}

// Select a company
// TODO:
export interface ICompanyFull {
    id: string;
    company_name: string;
    created_at: DateString;
}

export interface IProblem {
    id: string;
    question_id: number;
    question_title: string;
    question_title_slug: string;
    total_accepted: number;
    total_submitted: number;
    frontend_question_id: number;
    difficulty: ProblemDifficulty;
    paid_only: boolean;
}

export interface INote {
    id: string;
    user_id: string;
    title: string;
    description: string;
    body: string;
    type: NoteType;
    created_at: DateString;
    updated_at: DateString;
    visibility: VisibilityType;
    company_id: string | null;
    problem_id: string | null;
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    created_at: DateString;
    updated_at: DateString;
    visibility: VisibilityType;
    emailVerified: DateString | null;
    image: string | null;
}

/**
 * API Response Types
 */


export interface IApiResponse {
    ok: boolean;
    status: number;
    message: string;
    data: unknown;
}

export interface IResponseOk extends IApiResponse {
    ok: true;
}

export interface IResponseError extends IApiResponse {
    ok: false;
}