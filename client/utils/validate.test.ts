import { ApiResponseType } from '@/types';
import { AdapterUser } from 'next-auth/adapters';

import Validate from './validate';

describe('Validate class', () => {
    describe('isNullish method', () => {
        it('should return true when given undefined or null values.', () => {
            const vals: (undefined | null)[] = [undefined, null];
            for (const v of vals) expect(Validate.isNullish(v)).toBe(true);
        });

        it('should return false when given non-undefined and non-null values.', () => {
            const vals = ['a', '', -1293.3, 0, [], {}, [null], false, true];
            for (const v of vals) expect(Validate.isNullish(v)).toBe(false);
        });
    });

    describe('isNotNullish method', () => {
        it('should return false when given undefined or null values.', () => {
            const vals: (undefined | null)[] = [undefined, null];
            for (const v of vals) expect(Validate.isNotNullish(v)).toBe(false);
        });

        it('should return true when given non-undefined and non-null values.', () => {
            const vals = ['a', '', -1293.3, 0, [], {}, [null], false, true];
            for (const v of vals) expect(Validate.isNotNullish(v)).toBe(true);
        });
    });

    describe('isString method', () => {
        it('should return true when given string values.', () => {
            const vals: string[] = ['', '23jlk#jdk', 'asdf' + 1];
            for (const v of vals) expect(Validate.isString(v)).toBe(true);
        });

        it('should return false when given non-string values.', () => {
            const vals = [null, undefined, 0, false, true, new Date(), [], {}];
            for (const v of vals) expect(Validate.isString(v)).toBe(false);
        });
    });

    describe('isBoolean method', () => {
        it('should return true when given boolean values.', () => {
            const vals: boolean[] = [true, false];
            for (const v of vals) expect(Validate.isBoolean(v)).toBe(true);
        });

        it('should return false when given non-boolean values.', () => {
            const vals = [null, undefined, 'false', NaN, 0, -0, '', 'hello'];
            for (const v of vals) expect(Validate.isBoolean(v)).toBe(false);
        });
    });

    describe('isNumber method', () => {
        it('should return true when given number values.', () => {
            const vals: number[] = [1, -3, 0, 0.234, 10e3, parseInt('3')];
            for (const v of vals) expect(Validate.isNumber(v)).toBe(true);
        });

        it('should return false when given non-number values.', () => {
            const vals = ['234', null, undefined, ''];
            for (const v of vals) expect(Validate.isNumber(v)).toBe(false);
        });
    });

    describe('isRecord method', () => {
        it('should return true when given a record.', () => {
            const vals: Record<never, unknown>[] = [{}, { k: 1 }, new Date()];
            for (const v of vals) expect(Validate.isRecord(v)).toBe(true);
        });

        it('should return false when given a non-record value.', () => {
            const vals = [[], [1], null, undefined, 0, '', '{k: 1}', true];
            for (const v of vals) expect(Validate.isRecord(v)).toBe(false);
        });
    });

    describe('isArray method', () => {
        it('should return true when given an array.', () => {
            const vals: Array<unknown>[] = [[], [123], [null], new Array(0)];
            for (const v of vals) expect(Validate.isArray(v)).toBe(true);
        });

        it('should return false when given a non-array array.', () => {
            const vals = ['234', false, undefined, null, {}, true, '[3,2]'];
            for (const v of vals) expect(Validate.isArray(v)).toBe(false);
        });
    });

    describe('isValidResponse', () => {
        it('should return true when given a valid API response object.', () => {
            const vals: ApiResponseType[] = [
                { ok: false, status: 200, message: '', data: null },
                { ok: true, status: 2384, message: '', data: {} },
            ];
            for (const v of vals)
                expect(Validate.isValidResponse(v)).toBe(true);
        });

        it('should return false when given a invalid API response object.', () => {
            const vals = [
                { ok: 'false', status: 200, message: '', data: [] },
                { ok: 0, status: 200, message: '', data: [] },
                { ok: false, status: '200', message: '', data: [] },
                { ok: false, status: 200, message: true, data: [] },
                { ok: false, status: 200, message: '' },
                { ok: false, status: 200, data: [] },
                { ok: false, message: '', data: [] },
                { status: 200, message: '', data: [] },
                {},
                [],
                null,
            ];
            for (const v of vals)
                expect(Validate.isValidResponse(v)).toBe(false);
        });
    });

    describe('isResponseOk method', () => {
        it('should return true when given a valid API Response object where the ok property is True.', () => {
            const val: ApiResponseType = {
                ok: true,
                status: 200,
                message: '',
                data: null,
            };
            expect(Validate.isResponseOk(val)).toBe(true);
        });

        it('should return false when given a valid API response where the ok property is False.', () => {
            const val: ApiResponseType = {
                ok: false,
                status: 200,
                message: '',
                data: null,
            };
            expect(Validate.isResponseOk(val)).toBe(false);
        });
    });

    describe('isResponseError method', () => {
        it('should return true when given a valid API Response object where the ok property is False.', () => {
            const val: ApiResponseType = {
                ok: false,
                status: 200,
                message: '',
                data: null,
            };
            expect(Validate.isResponseError(val)).toBe(true);
        });

        it('should return false when given a valid API response where the ok property is True.', () => {
            const val: ApiResponseType = {
                ok: true,
                status: 200,
                message: '',
                data: null,
            };
            expect(Validate.isResponseError(val)).toBe(false);
        });
    });

    describe('isDateString method', () => {
        it('should return true when given a valid date string', () => {
            const vals: string[] = [
                new Date().toString(),
                '2023-03-20T03:12:48.472237+00:00',
                '010101',
            ];
            for (const v of vals) expect(Validate.isDateString(v)).toBe(true);
        });

        it("should return false when given a string that doesn't represent a date", () => {
            const vals: string[] = [
                '',
                'January',
                '2023-03-:12:48.472237+00:00',
            ];
            for (const v of vals) expect(Validate.isDateString(v)).toBe(false);
        });
    });

    describe('isAdapterUser method', () => {
        it('should return true when given a valid adapter user object', () => {
            const vals: (Omit<AdapterUser, 'emailVerified'> & {
                emailVerified: string | null;
            })[] = [
                { id: '', email: '', emailVerified: null },
                { id: '', email: '', emailVerified: new Date().toString() },
            ];
            for (const v of vals)
                expect(Validate.isAdapterUserWithDateString(v)).toBe(true);
        });
    });
});
