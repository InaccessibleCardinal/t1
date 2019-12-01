export function initializeTable(headers, rows) {
    return makeUpdatedRows(rows, getHeaderValues(headers));
}

export function makeUpdatedRows(rows, headerValues) {
    let l = rows.length;
    let newRows =[];
    for (let i = 0; i <l; ++i) {
        let existingRow = rows[i];
        let newRow = makeNewRow(headerValues, existingRow);
        newRows.push(newRow);
    }
    return newRows;
}

export function makeNewRow(headerValues, existingRow) {
    let l = headerValues.length;
    let newRow = {};
    for (let i = 0; i < l; ++i) {
        let currentHeader = headerValues[i]
        newRow[currentHeader] = existingRow[currentHeader];
    }
    return newRow;
}

export function getHeaderValues(headers) {
    let l = headers.length;
    let i = 0;
    let headerValues = [];
    for (; i < l; ++i) {
        headerValues.push(headers[i].value);
    }
    return headerValues;
}