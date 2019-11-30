export function validateHeadersAndRows(headers, rows) {

    console.log('mismatch: ',
        mismatch(headers, rows)
    )
    return mismatch(headers, rows);
    
}

function mismatch(headers, rows) {
    let headersLength = headers.length;
    let l = rows.length;
    for (let i = 0; i < l; ++i) {
        
        let ithRowKeys = Object.keys(rows[i]);
        
        if (headersLength !== ithRowKeys.length) { //check for length mismatch
            return {headerRowKeysLengthError: true};
        }
    
        if (areHeadersRowKeysMismatched(headers, ithRowKeys, headersLength)) { //check for key "value" mismatch
            return {headersRowKeysMatchingError: true};
        }
    }
    return null;
}

function areHeadersRowKeysMismatched(headers, rowKeys, length) {
    for (let i = 0; i < length; ++i) {
        if (headers[i].value !== rowKeys[i]) {
            return true;
        }
    }
    return false;
} 