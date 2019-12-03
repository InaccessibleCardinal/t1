import {BTN_PART} from '../constants';
import {sortByColumn} from './sortByColumn';
import {initializeTable} from './initializeTable';
import makeTotalRowArray from './makeTotalRowArray';
/**
 * getColumnByButtonId
 * @param {string} buttonId 
 */
function getColumnByButtonId(buttonId) {
    return buttonId.replace(BTN_PART, '');
}

const UTIL_FUNCS = {
    initializeTable,
    getColumnByButtonId,
    sortByColumn,
    makeTotalRowArray
};

export default UTIL_FUNCS;


