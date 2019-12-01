import React, {useState, useCallback, useEffect, createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import utils from './utils/';
import {UPDATE_SORT} from './constants';

const {getColumnByButtonId, sortByColumn, initializeTable} = utils;

export const SortingContext = createContext();

export default function SortableTable({
    headers, 
    rows, 
    isSortable, 
    className, 
    formatters
}) {
    
    const [tableIsSet, setTableIsSet] = useState(false);
    const [tableRowData, setTableRowData] = useState([]);
    const [tableHeaderData, setTableHeaderData] = useState([]);
    const [isAsc, setIsAsc] = useState(1);
    const [sortState, dispatch] = useReducer(sortingReducer, {asc: 1, sortedBy: '', className})

    useEffect(() => {

        if (!tableIsSet) {
            const updatedRows = initializeTable(headers, rows);
            setTableHeaderData(headers);
            setTableRowData(updatedRows);
            setTableIsSet(true);
        }
        
    }, [headers, rows, tableIsSet]);

    const handleClick = useCallback((e) => {
        if (isSortable) {
            let column = getColumnByButtonId(e.target.id);
            setTableRowData(sortByColumn(column, tableRowData, isAsc));
            setIsAsc(-1 * isAsc);
            dispatch({type: UPDATE_SORT, payload: {asc: isAsc, sortedBy: column}});
        } else {  
            return false;
        }
    }, [isAsc, isSortable, tableRowData]);

    return (
        <SortingContext.Provider value={sortState}>
            <table className={className}>
                <TableHeader 
                    className={className} 
                    headers={tableHeaderData} 
                    handleClick={handleClick} 
                />
                <TableBody 
                    tableRowData={tableRowData} 
                    className={className} 
                    formatters={formatters} 
                />
            </table>
        </SortingContext.Provider>
    );
}

SortableTable.propTypes = {
    className: PropTypes.string,
    formatters: PropTypes.object,
    headers: PropTypes.arrayOf(PropTypes.object).isRequired, 
    isSortable: PropTypes.bool, 
    rows: PropTypes.arrayOf(PropTypes.object).isRequired
};

export function sortingReducer(state, action) {
    if (action.type === UPDATE_SORT) {
        return {...state, ...action.payload};
    }
    return state;
}