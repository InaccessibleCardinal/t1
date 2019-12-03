export default function makeTotalRowArray(total, tableRowData, headers) {
    if (!total) {
        return [];
    }
    let {totalColumns} = total;
    let totalRowArray = [];
    //headers, aka columns should be manageable size, so we'll use prototype methods
    headers.forEach((h, i) => {
        let o = {index: -1};
        let hValue = h.value; 
        totalColumns.forEach(c => {
            if (c === hValue) {
                o.index = i;
                o.total = getTotal(c, tableRowData);
            }
        });
        totalRowArray.push(o);
    });
    return totalRowArray;
}

export function getTotal(columnId, tableRowData) {
    let total = 0;
    let l = tableRowData.length;
    let i = 0;
    //for-loop rather than reduce because tableRowData may be a large array
    for (; i < l; ++i) {
        let value = tableRowData[i][columnId];
        if (process.env.NODE_ENV === 'development') {
            if (typeof value !== 'number') {
                throw new TypeError('The values in your total columns need to be numbers.');
            }
        }
        total += value;
    }
    return total;
}