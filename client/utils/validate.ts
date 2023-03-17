// TODO: what does this do?
// Example usage:
import { AssertionError } from 'assert';

// IsNotNull().isNotUndefined()
export default class Validate<T> {
    static assertIsDefined<T>(data: T): asserts data is NonNullable<T> {
        if (data === undefined || data == null) {
            throw new AssertionError();
        }
    }

    static assertIsArray<T>(data: T): asserts data is T {
        if (!(Array.isArray(data) && data.length > 0)) {
            throw new AssertionError();
        }
    }

    // isArray() {
    //     if (Array.isArray(this.data)) return this;
    //     throw Error('Validation Error: is not an array');
    // }

    // isNotEmptyArray() {
    //     if (this.isArray() && (this.data as T[]).length > 0) {
    //         return this;
    //     } else {
    //         throw Error('Validation Error: array is empty');
    //     }
    // }

    // data.fieldsExists('a', 'b', 'c') ==> returns true if every fields exists in object data.
    // fieldsExist(...fields: string[]) {
    //     if (typeof this.data === 'object' && this.isNotNull()) {
    //         for (let field of fields) {
    //             if (this.data !== null && !(field in this.data)) {
    //                 throw Error(`${field} doesn't exist in object.`);
    //             }
    //         }
    //     }

    //     return this;
    // }
}
