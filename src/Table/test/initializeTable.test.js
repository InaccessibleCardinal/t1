import {validateHeader, makeNewRow, getHeaderValues} from '../utils/initializeTable';

describe('validateHeader func', () => {
    it ('should return null if theheader is valid', () => {
        expect(
            validateHeader('a', {a: 1, b: 3, c: 2}, 1)
        ).toEqual(null);
    });

    it ('should return an error', () => {
        expect(
            validateHeader('a', {b: 3, c: 2}, 1) instanceof Error
        ).toBe(true);
    });
});

describe('makeNewRow func', () => {
    it('should make a new table row with the selected header values', () => {
        const row = {a: 1, b: 2, c: 3, d: 4, e: 0};
        const headerValues = ['a', 'c', 'd'];
        expect(makeNewRow(headerValues, row)).toEqual({a: 1, c: 3, d: 4});
    });
});

describe('getHeaderValues func', () => {
    it('should map the values from headers to an array of values', () => {
        const headers = [{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}];
        expect(getHeaderValues(headers))
        .toEqual(
            headers.map(h => {
                return h.value;
            })
        );
    });
});