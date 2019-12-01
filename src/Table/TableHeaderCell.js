import React, {useContext} from 'react';
import {SortingContext} from './index';
import {BTN_PART} from './constants';

export default function TableHeaderCell({header, className, handleClick}) {
    const {asc, sortedBy} = useContext(SortingContext);
    const {value, displayValue} = header;
    const isActiveHeader = sortedBy === value;
    return (
        <th className={`${className}-header-th`}>
            <div className={ makeSortIndicatorClassName(asc, isActiveHeader, className)} />
            <button 
                className={`${className}-header-button`} 
                id={`${BTN_PART}${value}`} 
                onClick={handleClick}
            >
                {displayValue ? displayValue : value}
            </button>
        </th>
    );
}

export function makeSortIndicatorClassName(asc, isActiveHeader, className) {
    if (!isActiveHeader) {
        return `${className}-header-sort-indicator`;
    } else {
        if (asc === 1) {
            return `${className}-header-sort-indicator asc`;
        } else {
            return `${className}-header-sort-indicator dsc`;
        }
    }
}