import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {SortingContext} from './index';

export default function TableRow({rowData, formatters}) {
    const {className} = useContext(SortingContext);
    return (
        <tr className={`${className}-row`}>
            {generateRowMarkup(rowData, className, formatters)}
        </tr>
    );
}

TableRow.propTypes = {
    formatters: PropTypes.object,
    rowData: PropTypes.object
};
/**
 * generateRowMarkup
 * @param {object} item 
 * @param {string} className 
 * @param {object} formatters 
 */
export function generateRowMarkup(item, className, formatters) {
    let keys = Object.keys(item);
    let _id = item._id;
    let l = keys.length;
    let markup = [];
    for (let i = 0; i < l; ++i) {
        //old school for-loops are faster
        if (keys[i] !== '_id') { //_id is only used internally, see utils/initializeTable.js
            let value = item[keys[i]];
            let itemToRender;
            if (formatters) {
                if (formatters[keys[i]]) {
                    itemToRender = formatters[keys[i]](value);
                } else {
                    itemToRender = value;
                }
            } else {
                itemToRender = value;
            }
            markup.push(
                <td className={`${className}-td`} key={`row_${_id}_item_${i}`}>
                    {itemToRender}
                </td>
            );
        }
    }
    return markup;
}