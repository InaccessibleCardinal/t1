import u from '../utils/';
import {mismatch, areHeadersRowKeysMismatched} from '../utils/validateHeadersAndRows';
import {HDR_ROW_KEY_LENGTH_ERROR, HDR_ROW_KEY_MATCH_ERROR} from '../constants';
const {getColumnByButtonId, sortByColumn} = u;

describe('getColumnByButtonId func', () => {
    it ('should return a value', () => {
        expect (
            getColumnByButtonId('headerButton_abc')
        ).toBe('abc');
    });
});

describe('sortByColumn func', () => {
    it('should sort ascending', () => {
        const rowData = [{a: 42, b: 1}, {a: 40, b: 2}, {a: 12, b: 0}];
        expect(sortByColumn('a', rowData, 1)).toEqual([
            {a: 12, b: 0}, {a: 40, b: 2}, {a: 42, b: 1}
        ]);
    });
    it('should sort ascending', () => {
        const rowData = [{a: 42, b: 111}, {a: 40, b: 2}, {a: 12, b: 10}];
        expect(sortByColumn('b', rowData, 1)).toEqual([
            {a: 40, b: 2}, {a: 12, b: 10}, {a: 42, b: 111}
        ]);
    });

    it('should sort descending', () => {
        const rowData = [{a: 42, b: 1}, {a: 40, b: 2}, {a: 12, b: 0}];
        expect(sortByColumn('a', rowData, -1)).toEqual([
            {a: 42, b: 1}, {a: 40, b: 2}, {a: 12, b: 0}
        ]);
    });

    it('should sort descending', () => {
        const rowData = [{a: 42, b: 111}, {a: 40, b: 2}, {a: 12, b: 10}];
        expect(sortByColumn('b', rowData, -1)).toEqual([
            {a: 42, b: 111}, {a: 12, b: 10}, {a: 40, b: 2}
        ]);
    });

    it('should skip sorting when values are objects', () => {
        const rowData = [{a: {}, b: 111}, {a: {}, b: 2}, {a: [1], b: 10}];
        expect(sortByColumn('a', rowData, -1)).toEqual(rowData);
    });

    it('should leave order preserved when values are equal', () => {
        const rowData = [{a: 1, b: 111}, {a: 1, b: 2}];
        expect(sortByColumn('a', rowData, 1)).toEqual(rowData);
    });
    
});

describe('areHeadersRowKeysMismatched func', () => {
    it('should return false when headers are valid', () => {
        const headers = [{value: 'name'}, {value: 'age'}, {value: 'email'}];
        const rowKeys = ['name', 'age', 'email'];
        const l = 3;
        expect(areHeadersRowKeysMismatched(headers, rowKeys, l)).toBe(false);
    });

    it('should return true when headers are invalid', () => {
        const headers = [{value: 'name'}, {value: 'age'}, {value: 'email'}];
        const rowKeys = ['name', 'age', 'website'];
        expect(areHeadersRowKeysMismatched(headers, rowKeys, 3)).toBe(true);
    });

});

describe('mismatch func', () => {
    it('should return null when table data structure is valid', () => {
        const headers = [{value: 'name'}, {value: 'age'}, {value: 'email'}];
        const rows = [
            {name: 'a', age: 33, email: 'myemail'},
            {name: 'aa', age: 99, email: 'myemail2'},
            {name: 'ab', age: 0, email: 'myemail3'},
            {name: 'abc', age: 101, email: 'myemail4'} 
        ];
        expect(mismatch(headers, rows)).toEqual(null);
    });

    it('should return a length error when table data structure is invalid', () => {
        const headers = [{value: 'name'}, {value: 'age'}, {value: 'email'}];
        const rows = [
            {name: 'a', age: 33, email: 'myemail'},
            {name: 'aa', age: 99},
            {name: 'ab', age: 0, email: 'myemail3'},
            {name: 'abc', age: 101, email: 'myemail4'} 
        ];
        expect(mismatch(headers, rows)).toEqual({[HDR_ROW_KEY_LENGTH_ERROR]: true});
    });

    it('should return a mismatch error when table data structure is invalid', () => {
        const headers = [{value: 'name'}, {value: 'age'}, {value: 'email'}];
        const rows = [
            {name: 'a', age: 33, email: 'myemail'},
            {name: 'aa', age: 99, emails: 'badkey'},
            {name: 'ab', age: 0, email: 'myemail3'},
            {name: 'abc', age: 101, email: 'myemail4'} 
        ];
        expect(mismatch(headers, rows)).toEqual({[HDR_ROW_KEY_MATCH_ERROR]: true});
    });
});

/**
 * 
 * export function mismatch(headers, rows) {
    let headersLength = headers.length;
    let l = rows.length;
    for (let i = 0; i < l; ++i) {
        
        let ithRowKeys = Object.keys(rows[i]);
        
        if (headersLength !== ithRowKeys.length) { //check for length mismatch
            return {[HDR_ROW_KEY_LENGTH_ERROR]: true};
        }
    
        if (areHeadersRowKeysMismatched(headers, ithRowKeys, headersLength)) { //check for key "value" mismatch
            return {[HDR_ROW_KEY_MATCH_ERROR]: true};
        }
    }
    return null;
}

export function areHeadersRowKeysMismatched(headers, rowKeys, length) {
    for (let i = 0; i < length; ++i) {
        if (headers[i].value !== rowKeys[i]) {
            return true;
        }
    }
    return false;
} 
 */