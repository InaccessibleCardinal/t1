import React from 'react';
import {BTN_PART} from './constants';

export default function TableHeader({className, headers, handleClick}) {
    const tableHeaderMarkup = headers.map((h, i) => {
        let {value, displayValue} = h;
        return (
            <th className={`${className}-header-th`} key={i}>
                <button 
                    className={`${className}-header-button`} 
                    id={`${BTN_PART}${value}`} 
                    onClick={handleClick}
                >
                    {displayValue ? displayValue : value}
                </button>
            </th>
        );
    });
    return (
        <thead className={`${className}-header-thead`}>
            <tr>{tableHeaderMarkup}</tr>
        </thead>
    );
}