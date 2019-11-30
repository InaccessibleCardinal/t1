import u from '../utils/';
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

