import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {SortingContext} from './index';
import {BTN_PART} from './constants';

export default function TableHeaderCell({header, handleClick}) {
    const {asc, sortedBy, className} = useContext(SortingContext);
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

TableHeaderCell.propTypes = {
    handleClick: PropTypes.func,
    header: PropTypes.object.isRequired
};

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