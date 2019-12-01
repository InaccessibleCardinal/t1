import React from 'react';
import TableHeaderCell from './TableHeaderCell';

export default function TableHeader({className, headers, handleClick}) {

    const tableHeaderMarkup = headers.map((h, i) => {
        return (
            <TableHeaderCell
                key={i}
                header={h} 
                className={className} 
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

