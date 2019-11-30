import React, {useState, useCallback, useEffect} from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import {getColumnByButtonId, sortByColumn, validateConfig} from './utils';

export default function SortableTable({config}) {
    
    const {headers, rows, isSortable, className, formatting} = config;
    const [configIsValid, setConfigIsValid] = useState(false);
    const [tableRowData, setTableRowData] = useState(rows);
    const [isAsc, setIsAsc] = useState(1);

    useEffect(() => {
        //if (env === PROD) {setConfigIsValid(true);} //TODO
        if (validateConfig(config) && !configIsValid) {
            setConfigIsValid(true);
        }
    }, [config, configIsValid]);


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
            <TableHeader className={className} headers={headers} handleClick={handleClick} />
            <TableBody tableRowData={tableRowData} className={className} formatting={formatting} />
        </table>
    );
}
