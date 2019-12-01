import {BTN_PART} from '../constants';
import {sortByColumn} from './sortByColumn';
import {validateHeadersAndRows} from './validateHeadersAndRows';
import {initializeTable} from './initializeTable';

function getColumnByButtonId(buttonId) {
    return buttonId.replace(BTN_PART, '');
}

const UTIL_FUNCS = {
    initializeTable,
    getColumnByButtonId,
    sortByColumn,
    validateHeadersAndRows
};

export default UTIL_FUNCS;


