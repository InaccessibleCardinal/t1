import React, {useContext} from 'react';
import {SortingContext} from './index';

export default function TableFooter() {
    const {className} = useContext(SortingContext);
    return (
        <tfoot className={`${className}-tfoot`}>
            <TableRow />
        </tfoot>
    );
}

function TableRow() {
    const {className, total} = useContext(SortingContext);
    const {totalRowArray, isMonetary} = total;
    const totalRowMarkup = totalRowArray.map((obj, i) => {
        let {index, total} = obj;
        if (index === -1) {
            return (
                <td key={i} className={`${className}-tfoot-td empty`}></td>
            );
        } else {
            return (
                <td key={i} className={`${className}-tfoot-td`}>
                    <span className={`${className}-tfoot-span-total`}>
                        Total: 
                    </span>
                    <span className={`${className}-tfoot-span-total value`}>
                        {formatTotal(total, isMonetary)}
                    </span>
                </td>
            );
        }
    });
    return (
        <tr>
            {totalRowMarkup}
        </tr>
    );
}

function formatTotal(total, isMonetary) {
    return isMonetary ? `$ ${total.toFixed(2)}` : total;
}