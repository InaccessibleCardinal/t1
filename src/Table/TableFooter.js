import React, {useContext} from 'react';
import {SortingContext} from './index';

export default function TableFooter() {
    const {className} = useContext(SortingContext);
    return (
        <tfoot className={`${className}-tfoot`}>
            <FooterRow />
        </tfoot>
    );
}

function FooterRow() {
    const {className, totalRowArray} = useContext(SortingContext);
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
                        {total}
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