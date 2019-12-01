import React from 'react';

export default function TableBody({tableRowData, className, formatters}) {
    let tableRowMarkup = [];
    let l = tableRowData.length;
    for (let i = 0; i < l; ++i) {
        //this happens every render
        //old school for-loop is faster, and not by a little
        tableRowMarkup.push(
            <tr className={`${className}-row`} key={`row_${i}`}>
                {generateRowMarkup(tableRowData[i], i, className, formatters)}
            </tr>
        );
    }
    return (
        <tbody className={`${className}-body`}>
            {tableRowMarkup}
        </tbody>
    );
}

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

