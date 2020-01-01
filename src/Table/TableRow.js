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
    let _id = item._id;
    return Object.keys(item).reduce((acc, currKey, i) => {
        if (currKey !== '_id') {
            let value = item[currKey];
            let itemToRender;
            if (formatters && formatters[currKey]) {
                itemToRender = formatters[currKey](value);
            } else {
                itemToRender = value;
            }
            acc.push(
                <td className={`${className}-td`} key={`row_${_id}_item_${i}`}>
                    {itemToRender}
                </td>
            );
            return acc;
        }
        return acc;
    }, []);
}