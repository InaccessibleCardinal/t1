import React, {useState, useCallback, useEffect} from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import utils from './utils/';

const {getColumnByButtonId, sortByColumn, initializeTable, validateHeadersAndRows} = utils;

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

    useEffect(() => {

        if (!tableIsSet) {
            const updatedRows = initializeTable(headers, rows);
            validateHeadersAndRows(headers, updatedRows);
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
        } else {  
            return false;
        }
    }, [isAsc, isSortable, tableRowData]);

    
    return (
        <table className={className}>
            <TableHeader className={className} headers={tableHeaderData} handleClick={handleClick} />
            <TableBody tableRowData={tableRowData} className={className} formatters={formatters} />
        </table>
    );
}
