import {HDR_ROW_KEY_LENGTH_ERROR, HDR_ROW_KEY_MATCH_ERROR} from '../constants';

export function validateHeadersAndRows(headers, rows) {
    //for now this is it...
    return mismatch(headers, rows);
    
}

export function mismatch(headers, rows) {
    let headersLength = headers.length;
    let l = rows.length;
    for (let i = 0; i < l; ++i) {
        
        let ithRowKeys = Object.keys(rows[i]);
        
        if (headersLength !== ithRowKeys.length) { //check for length mismatch
            return {[HDR_ROW_KEY_LENGTH_ERROR]: true};
        }
    
        if (areHeadersRowKeysMismatched(headers, ithRowKeys, headersLength)) { //check for key "value" mismatch
            return {[HDR_ROW_KEY_MATCH_ERROR]: true};
        }
    }
    return null;
}

export function areHeadersRowKeysMismatched(headers, rowKeys, length) {
    for (let i = 0; i < length; ++i) {
        if (headers[i].value !== rowKeys[i]) {
            return true;
        }
    }
    return false;
} 