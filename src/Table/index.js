import React, {useState, useCallback, useEffect} from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import utils from './utils/';

const {getColumnByButtonId, sortByColumn, updateHeadersAndRows, validateHeadersAndRows} = utils;

export default function SortableTable({
    headers, 
    rows, 
    isSortable, 
    className, 
    formatting, 
    selectiveHeaders
}) {
    
    const [modifiedHeaders, setModifiedHeaders] = useState(false);
    // const [configIsValid, setConfigIsValid] = useState(false);
    const [tableRowData, setTableRowData] = useState([]);
    const [tableHeaderData, setTableHeaderData] = useState([]);
    const [isAsc, setIsAsc] = useState(1);

    useEffect(() => {
        
        if (selectiveHeaders && !modifiedHeaders) {
            const {updatedHeaders, updatedRows} = updateHeadersAndRows(headers, rows, selectiveHeaders);
            validateHeadersAndRows(updatedHeaders, updatedRows);
            setModifiedHeaders(true);
            setTableRowData(updatedRows);
            setTableHeaderData(updatedHeaders);
        } else if (!selectiveHeaders && !modifiedHeaders) {
            validateHeadersAndRows(headers, rows);
            setTableRowData(rows);
            setTableHeaderData(headers);
        }
        
    }, [/*configIsValid, */headers, rows, modifiedHeaders, selectiveHeaders]);


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
            <TableBody tableRowData={tableRowData} className={className} formatting={formatting} />
        </table>
    );
}
