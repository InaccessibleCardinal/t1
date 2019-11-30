import {BTN_PART} from './constants';

export function getColumnByButtonId(buttonId) {
    return buttonId.replace(BTN_PART, '');
}

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


export function validateConfig(config) {
    let {headers, rows} = config;
    if (areKeysMismatched(headers.map(h => h.value), rows)) {
        return false;
    }
}

function areKeysMismatched(headerValues, rows) {
    let mismatched = false;
    let l = rows.length;
    for (let i = 0; i < l; ++i) {

        let itemKeys = Object.keys(rows[i]);
        if (headerValues.length !== itemKeys.length) {
            console.warn(
                `Check the signature of your objects. You have ${headerValues.length} headers, but the object ${rows[i]} in row ${i} has ${itemKeys.length} keys.`
            );
            mismatched = true;
            return mismatched;
        }
    }
    return mismatched;
}