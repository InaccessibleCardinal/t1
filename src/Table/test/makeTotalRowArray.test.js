import makeTotalRowArray, {getTotal} from '../utils/makeTotalRowArray';

describe('getTotal function', () => {
    it('should add up numerical values in a column', () => {
        let tableRowData = [{value: 22}, {value: 21}, {value: 492}, {value: 12}, {value: 100}];
        expect(getTotal('value', tableRowData)).toBe(647);
    });
    it('should throw a TypeError', () => {
        let t = [{v: 'a'}, {v: 2}];
        expect(() => getTotal('v', t)).toThrow(TypeError);
    });

});


describe('makeTotalRowArray function', () => {
    it('should create ana array of objects', () => {
        let tableRowData = [
            {x: 22, y: 1, other: 'abc'}, 
            {x: 21, y: 2, other: 'aaa'}, 
            {x: 492, y: 3,  other: 'b'}, 
            {x: 12, y: 4, other: 'a'}, 
            {x: 100, y: 5, other: 'c'}
        ];
        let total = {totalColumns: ['x', 'y']};
        let headers = [{value: 'x'}, {value: 'y'}, {value: 'other'}];
        expect(makeTotalRowArray(total, tableRowData, headers))
        .toEqual([
            {index: 0, total: 647},
            {index: 1, total: 15},
            {index: -1}
        ]);
    });
});