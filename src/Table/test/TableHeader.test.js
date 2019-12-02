import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import TableHeader from '../TableHeader';
import {SortingContext} from '../index';

const testContext = {
    asc: 1, 
    sortedBy: '', 
    tableHeaderData: [{value: 'name', displayValue: 'EL NAME'}, {value: 'age'}]
};

describe('TableHeader component', () => {

    it('should render headers with values and click handlers', () => {

        const handleClick = jest.fn();
        const props = {className: 'my-class', handleClick};
        const {queryByText, getByText} = render(
            <SortingContext.Provider value={testContext}>
                <table>
                    <TableHeader {...props} />
                </table>
            </SortingContext.Provider>,
        );

        expect(queryByText(/EL NAME/i)).toBeDefined();

        fireEvent.click(getByText(/EL NAME/i));
        expect(handleClick).toHaveBeenCalled();

    });

    it('should render headers with displayValues and click handlers', () => {

        const handleClick = jest.fn();
        const headers = [{value: '1', displayValue: 'one'}, {value: '2', displayValue: 'two'}, {value: '3', displayValue: 'three'}];
        const testContext2 = {...testContext, tableHeaderData: headers};  
        const props = {className: 'my-class', handleClick};
        const {queryByText, getByText} = render(
            <SortingContext.Provider value={testContext2}>
                <table>
                    <TableHeader {...props} />
                </table>
            </SortingContext.Provider>,
        );

        expect(queryByText('two')).toBeDefined();

        fireEvent.click(getByText(/two/i));
        expect(handleClick).toHaveBeenCalled();

    });

});