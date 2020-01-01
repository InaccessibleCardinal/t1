import React, {useCallback, useEffect, createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import utils from './utils/';
import {UPDATE_SORT} from './constants';

const {getColumnByButtonId, sortByColumn, initializeTable, makeTotalRowArray} = utils;
export const SortingContext = createContext();
export const initialState = {
    asc: 1, 
    sortedBy: '', 
    className: '',
    tableHeaderData: [], 
    tableRowData: [], 
    totalRowArray: []
};

export default function SortableTable({
    headers, 
    rows, 
    isSortable, 
    className, 
    formatters,
    total
}) {

    const [sortState, dispatch] = useReducer(sortingReducer, initialState);
    useEffect(() => {
        const tableRowData = initializeTable(headers, rows);
        dispatch({
            type: UPDATE_SORT, 
            payload: {
                className,
                tableRowData, 
                tableHeaderData: headers,
                totalRowArray: makeTotalRowArray(total, tableRowData, headers),
            }
        });
        
    }, [className, headers, rows, total]);

    const handleClick = useCallback((e) => {
        if (isSortable) {
            let column = getColumnByButtonId(e.target.id);
            let {tableRowData, asc} = sortState;
            dispatch({
                type: UPDATE_SORT, 
                payload: {
                    asc: asc * -1, 
                    sortedBy: column,
                    tableRowData: sortByColumn(column, tableRowData, asc * -1)
                }
            }); 
        } else {  
            return false;
        }
    }, [isSortable, sortState]);

    return (
        <SortingContext.Provider value={sortState}>
            <table className={className}>
                <TableHeader handleClick={handleClick} />
                <TableBody formatters={formatters} />
                {total && <TableFooter />}
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
/**
 * sortingReducer
 * @param {object} state 
 * @param {object} action 
 */
export function sortingReducer(state, action) { //lol yep that's it
    if (action.type === UPDATE_SORT) {
        return {...state, ...action.payload};
    }
    return state;
}