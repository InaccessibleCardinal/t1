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
    let cl = className ? className : '';
    console.log('TRA: ', totalRowArray)
    const totalRowMarkup = totalRowArray.map((obj, i) => {
        let {index, total} = obj;
        if (index === -1) {
            return (
                <td key={i} className={`${cl}-tfoot-td empty`}></td>
            );
        } else {
            return (
                <td key={i} className={`${cl}-tfoot-td`}>
                    <span className={`${cl}-tfoot-span-total total-${i}`}> 
                    </span>
                    <span className={`${cl}-tfoot-span-total value`}>
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