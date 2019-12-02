import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableHeaderCell from './TableHeaderCell';
import {SortingContext} from './index';

export default function TableHeader({handleClick}) {
    const {className, tableHeaderData: headers} = useContext(SortingContext);
    const tableHeaderMarkup = headers.map((h, i) => {
        return (
            <TableHeaderCell
                key={i}
                header={h} 
                handleClick={handleClick}
            />
        );
    });
    return (
        <thead className={`${className}-header-thead`}>
            <tr>{tableHeaderMarkup}</tr>
        </thead>
    );
}

TableHeader.propTypes = {
    handleClick: PropTypes.func,
    // headers: PropTypes.arrayOf(PropTypes.object).isRequired
};