//in practice call this something like 'footer total'
export default function makeTotalRowArray(total, tableRowData, headers) {
    if (!total) {
        return [];
    }
    let {totalColumns} = total;
    let totalRowArray = [];
    headers.forEach((h, i) => {
        let o = {index: -1};
        let headerValue = h.value; 
        totalColumns.forEach(c => {
            if (c === headerValue) {
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
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            if (typeof value !== 'number') {
                throw new TypeError('The values in your total columns need to be numbers.');
            }
        }
        total += value;
    }
    return total;
}