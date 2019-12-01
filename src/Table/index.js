import React, {useState, useCallback, useEffect, createContext, useReducer} from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import utils from './utils/';
import {UPDATE_SORT} from './constants';

const {getColumnByButtonId, sortByColumn, initializeTable} = utils;

export const SortingContext = createContext();

export function sortingReducer(state, action) {
    if (action.type === UPDATE_SORT) {
        return action.payload;
    }
    return state;
}

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
    const [sortState, dispatch] = useReducer(sortingReducer, {asc: 1, sortedBy: ''})

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
        
        <table className={className}>
            <SortingContext.Provider value={sortState}>
                <TableHeader 
                    className={className} 
                    headers={tableHeaderData} 
                    handleClick={handleClick} 
                />
            </SortingContext.Provider>
            <TableBody 
                tableRowData={tableRowData} 
                className={className} 
                formatters={formatters} 
            />
        </table>
    );
}
