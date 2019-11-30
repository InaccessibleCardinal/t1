export function sortByColumn(columnId, tableRowData, isAsc) {

    return [...tableRowData].sort((a, b) => {
        let valueA = a[columnId];
        let valueB = b[columnId];
        if (typeof valueA === 'object' || typeof valueB === 'object') {
            //break out to not compare sub-components even though this seems to not matter
            return 0; 
        }
        if (valueA < valueB) { //normal comparable asci values
            return -1 * isAsc;
        } else if (valueB < valueA) {
            return 1 * isAsc;
        } else {
            return 0;
        }
    });
}