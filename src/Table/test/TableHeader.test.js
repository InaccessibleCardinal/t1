import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import TableHeader from '../TableHeader';

describe('TableHeader component', () => {

    it('should render headers with values and click handlers', () => {

        const handleClick = jest.fn();
        const headers = [{value: '1'}, {value: '2'}, {value: '3'}];  
        const props = {className: 'my-class', headers, handleClick};
        const {queryByText, getByText} = render(
            <table>
                <TableHeader {...props} />
            </table>,
        );

        expect(queryByText('1')).toBeDefined();

        fireEvent.click(getByText(/1/i));
        expect(handleClick).toHaveBeenCalled();

    });

    it('should render headers with displayValues and click handlers', () => {

        const handleClick = jest.fn();
        const headers = [{value: '1', displayValue: 'one'}, {value: '2', displayValue: 'two'}, {value: '3', displayValue: 'three'}];  
        const props = {className: 'my-class', headers, handleClick};
        const {queryByText, getByText} = render(
            <table>
                <TableHeader {...props} />
            </table>,
        );

        expect(queryByText('two')).toBeDefined();

        fireEvent.click(getByText(/two/i));
        expect(handleClick).toHaveBeenCalled();

    });

});