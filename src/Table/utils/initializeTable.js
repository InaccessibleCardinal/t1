import uuid from 'uuid/v4';
/**
 * initializeTable
 * @param {[]object} headers 
 * @param {[]object} rows 
 */
export function initializeTable(headers, rows) {
    //Whatever headers are specified, and their order, determine what data gets into the table
    return makeUpdatedRows(rows, getHeaderValues(headers));
}
/**
 * makeUpdatedRows
 * @param {[]object} rows 
 * @param {[]string} headerValues 
 */
export function makeUpdatedRows(rows, headerValues) {
    //throughout the codebase, for-loops are used
    //instead of array prototype methods except in cases
    //in which rendering performance will not conceivably be impacted
    let l = rows.length;
    let newRows =[];
    for (let i = 0; i <l; ++i) {
        let existingRow = rows[i];
        let newRow = makeNewRow(headerValues, existingRow);
        newRows.push(newRow);
    }
    return newRows;
}
/**
 * makeNewRow
 * @param {[]string} headerValues 
 * @param {object} existingRow 
 */
export function makeNewRow(headerValues, existingRow) {
    let l = headerValues.length;
    //uuids are only used here as keys for table row rerendering performance
    //because the data may not have ids, the user might not pass them in
    //and because array indices are bad keys for sortable lists
    let newRow = {_id: uuid()};
    for (let i = 0; i < l; ++i) {
        let currentHeader = headerValues[i];
        if (process.env.NODE_ENV === 'development') {
            validateHeader(currentHeader, existingRow, i);
        }
        newRow[currentHeader] = existingRow[currentHeader];
    }
    return newRow;
}
/**
 * getHeaderValues
 * @param {[]objects} headers 
 */
export function getHeaderValues(headers) {
    let l = headers.length;
    let i = 0;
    let headerValues = [];
    for (; i < l; ++i) {
        headerValues.push(headers[i].value);
    }
    return headerValues;
}
/**
 * validateHeader
 * @param {string} headerValue 
 * @param {object} row 
 * @param {int} rowIndex 
 */
export function validateHeader(headerValue, row, rowIndex) {
    if (!row[headerValue]) {
        return new Error(
            `The row ${JSON.stringify(row)} at row-index ${rowIndex} does not have the attribute ${headerValue}. Compare youre header values with the signatures of the objects in your table rows.`
        );
    }
    return null;
}
