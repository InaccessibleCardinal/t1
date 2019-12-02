import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {SortingContext} from './index';

export default function TableRow({rowData, index, formatters}) {
    const {className} = useContext(SortingContext);
    return (
        <tr className={`${className}-row`} key={`row_${rowData.id}`}>
            {generateRowMarkup(rowData, index, className, formatters)}
        </tr>
    );
}

TableRow.propTypes = {
    formatters: PropTypes.object,
    index: PropTypes.number.isRequired
};

export function generateRowMarkup(item, itemIndex, className, formatters) {
    let keys = Object.keys(item);
    let l = keys.length;
    let markup = [];
    for (let i = 0; i < l; ++i) {
        //old school for-loops are faster
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
            <td className={`${className}-td`} key={`row_${itemIndex}_item_${i}`}>
                {itemToRender}
            </td>
        );
    }
    return markup;
}