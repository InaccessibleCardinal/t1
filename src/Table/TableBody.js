import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import {SortingContext} from './index';

export default function TableBody({formatters}) {
    const {className, tableRowData} = useContext(SortingContext);
    let tableRowMarkup = [];
    let l = tableRowData.length;
    for (let i = 0; i < l; ++i) {
        //this happens every render
        //old school for-loop is faster, and not by a little
        let ithRowData = tableRowData[i];
        tableRowMarkup.push(
            <TableRow 
                key={ithRowData.id ? ithRowData.id : i}
                index={i} 
                rowData={ithRowData} 
                formatters={formatters} 
            />
        );
    }
    return (
        <tbody className={`${className}-body`}>
            {tableRowMarkup}
        </tbody>
    );
}

TableBody.propTypes = {
    formatters: PropTypes.object
};