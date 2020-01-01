import React from 'react'
import {render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import SortableTable from '../index';

describe('SortableTable component', () => {
    const someRows = [
        {name: 2, age: 33, size: 0}, 
        {name: 28, age: 11, size: 60}, 
        {name: 2.8, age: 100, size: 67}, 
        {name: 98, age: 4, size: 6}
    ];
    afterEach(cleanup);
    it('should render a table', () => {
        const config = {
            headers: [{value: 'name'}, {value: 'age'}, {value: 'size'}],  
            rows: someRows,
            isSortable: false,
            className: 'my-table',
            formatters: null
        };
        
        const {queryByText, getByText} = render(
            <SortableTable {...config} />,
        );

        expect(queryByText('name')).toBeInTheDocument();
        expect(queryByText('age')).toBeInTheDocument();
        expect(queryByText('size')).toBeInTheDocument();
        fireEvent.click(getByText(/size/i));

        expect(queryByText('2')).toBeInTheDocument();
        expect(queryByText('60')).toBeInTheDocument();
        expect(queryByText('98')).toBeInTheDocument();
    });

    it('should render a table with  jsx formatted column/s', () => {
        const config = {
            headers: [{value: 'prop1'}, {value: 'prop2'}],  
            rows: [{prop1: 2, prop2: 33}, {prop1: 28, prop2: 11}],
            isSortable: true,
            className: 'my-table',
            formatters: {
                prop2: (value) => <p>My Value: {value}</p> 
            }
        };
        
        const {queryByText, queryAllByText, getByText} = render(
            <SortableTable {...config} />,
        );

        expect(queryAllByText(/My Value:/i).length > 0).toBe(true);
        fireEvent.click(getByText(/prop1/i));
        
    });

    it('should render a table with a footer', () => {
        const config = {
            headers: [{value: 'name'}, {value: 'age'}, {value: 'size'}],  
            rows: someRows,
            isSortable: true,
            className: 'my-table',
            formatters: null,
            total: {totalColumns: ['age', 'size']}
        };
        
        const {queryByText} = render(
            <SortableTable {...config} />,
        );
        expect(queryByText('name')).toBeInTheDocument();
        expect(queryByText('age')).toBeInTheDocument();
        expect(queryByText('size')).toBeInTheDocument();
        expect(queryByText('133')).toBeInTheDocument();

    
    });

});

