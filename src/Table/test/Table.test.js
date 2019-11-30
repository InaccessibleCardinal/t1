import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import SortableTable from '../index';

describe('SortableTable component', () => {

    it('should render a table', () => {
        const config = {
            headers: [{value: 'name'}, {value: 'age'}, {value: 'size'}],  
            rows: [
                {name: 2, age: 33, size: 0}, 
                {name: 28, age: 11, size: 60}, 
                {name: 2.8, age: 100, size: 67}, 
                {name: 98, age: 4, size: 6}
            ],
            isSortable: false,
            className: 'my-table',
            formatting: false
        };
        
        const {queryByText, getByText, unmount} = render(
            <SortableTable {...config} />,
        );

        expect(queryByText('name')).toBeDefined();
        expect(queryByText('age')).toBeDefined();
        expect(queryByText('size')).toBeDefined();
        fireEvent.click(getByText(/size/i));

        expect(queryByText('2')).toBeDefined();
        expect(queryByText('60')).toBeDefined();
        expect(queryByText('98')).toBeDefined();
        unmount();
    });

    it('should render a table with  jsx formatted column/s', () => {
        const config = {
            headers: [{value: 'prop1'}, {value: 'prop2'}],  
            rows: [{prop1: 2, prop2: 33}, {prop1: 28, prop2: 11}],
            isSortable: true,
            className: 'my-table',
            formatting: {
                prop2: (value) => <p>My Value: {value}</p> 
            }
        };
        
        const {queryByText, getByText, unmount} = render(
            <SortableTable {...config} />,
        );

        expect(queryByText(/My Value: 33 /i)).toBeDefined();
        expect(queryByText(/My Value: 11 /i)).toBeDefined();

        fireEvent.click(getByText(/prop1/i));
        unmount();
    });

});

