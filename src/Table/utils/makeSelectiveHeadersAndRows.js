export function updateHeadersAndRows(headers, rows, selectiveHeaders) {
    console.log('loop code running..')
    let l = selectiveHeaders.length;
    let updatedRows = updateRows(rows, selectiveHeaders);
    let updatedHeaders = []; 
    
    for (let i = 0; i < l; ++i) {
        let currentHeader = selectiveHeaders[i];
        updatedHeaders[i] = getHeader(headers, currentHeader);
    }
    return {updatedHeaders, updatedRows};
}

export function makeNewRow(selectiveHeaders, existingRow) {
    let l = selectiveHeaders.length;
    let newRow = {};
    for (let i = 0; i < l; ++i) {
        let currentHeader = selectiveHeaders[i]
        newRow[currentHeader] = existingRow[currentHeader];
    }
    return newRow;
}

export function updateRows(rows, selectiveHeaders) {
    let l = rows.length;
    let newRows =[];
    for (let i = 0; i <l; ++i) {
        let existingRow = rows[i];
        let newRow = makeNewRow(selectiveHeaders, existingRow);
        newRows.push(newRow);
    }
    return newRows;
}

export function getHeader(headers, currentHeader) {
    let l = headers.length;
    for (let i = 0; i < l; ++i) {
        if (headers[i].value === currentHeader) {
            return headers[i];
        }
    }
}