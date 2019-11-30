import {BTN_PART} from '../constants';
import {sortByColumn} from './sortByColumn';
import {validateHeadersAndRows} from './validateHeadersAndRows';
import {updateHeadersAndRows} from './makeSelectiveHeadersAndRows';

function getColumnByButtonId(buttonId) {
    return buttonId.replace(BTN_PART, '');
}

const UTIL_FUNCS = {
    getColumnByButtonId,
    sortByColumn,
    updateHeadersAndRows,
    validateHeadersAndRows
};

export default UTIL_FUNCS;


