# A sortable table

Sample Usage:

```JavaScript
...
import SortableTable from './Table';
import {yourDataArray} from '...';

const config = {
    headers: [{value: 'column1Name'}, ..., {value: 'columnNName'}],
    rows: yourDataArray,
    /***optional props***
    isSortable: boolean
    className: 'whatever',
    formatters: {...a map from column names to JSX...see below...}
    ***/
}
function YourComponent(props) {
    return (
    ...
        <SortableTable {...config} />
    ...
    );    
}
```
`yourDataArray` can be any array of objects with the same shape (i.e. the kind of stuff you might put in a table). This array will be used in the `rows` property, which is required. 

The `headers` property is also required, and it must at least be a list of objects with a "value" attribute, and each "value" attribute must match an object key from objects in your data array. If you don't want the object keys to be the actual values visible in your table headers, add a "displayValue" attribute to your headers like this:
```JavaScript
 headers: [
    {value: 'column1Name', displayValue: 'Whatever you want to call column 1'}, 
    ... 
    {value: 'columnNName', displayValue: 'Whatever You want to call column N'}
],
```
The data that gets into your table is determined by the headers property. If the objects in your data array have dozens of attributes, but you only want "name", "age" and "id" in your table, just pass `[{value: 'name'}, {value: 'age'}, {value: 'id'}]` as the `headers` prop. The table will ignore the other data keys. *The order in which columns show up* is also determined by *the order of your headers*.

The `isSortable` property will make the table sortable. "isSortable: true" will allow for sorting by column on the alphanumeric values in the table data. Clicking on the headers does the sorting. "isSortable: true" will make *any column that can be sorted* sortable. It's all or nothing.

The `className` property will be added to the table elements so you can style them if that's your thing. The classNames generated have a straightforward meaning:
- `YOUR_CLASSNAME-header-thead`
- `YOUR_CLASSNAME-header-th`
- `YOUR_CLASSNAME-header-button`
- `YOUR_CLASSNAME-header-sort-indicator`
- `YOUR_CLASSNAME-header-sort-indicator asc`
- `YOUR_CLASSNAME-header-sort-indicator dsc`
- `YOUR_CLASSNAME-body`
- `YOUR_CLASSNAME-row`
- `YOUR_CLASSNAME-td`

The table has no styling by default. The table headers know when the table is being sorted and by which header. There is a div that will toggle between CSS classes "...-header-sort-indicator", "...-header-sort-indicator.asc" and "...-header-sort-indicator.dsc", so you could style them like triangles, put custom background images in them, whatever. This may require positioning attributes on the "...header-th" and "...header-sort-indicator" CSS classes. You are on your own here. Have fun.

The `formatters` property allows you to map the data in certain columns to custom JSX outputs. Here is a simple example:
```JavaScript
const config = {
    ....
    formatters: {
        name: (cellValue) => <h2 style={{...whatever...}}>{cellValue}</h2> 
        age: (cellValue) => <button onClick={() => alert('LOL')}>{cellValue}</span>
    }
}
```
If the values in `yourDataArray[i].name` and `yourDataArray[i].age` are strings/numbers, the above configuration will render the names and ages in the way specified by the JSX. 

You can even do something more elaborate:
```JavaScript
...
import AddressDisplay from '...wherever';
...
const config = {
    ....
    formatters: {
        address: (nestedObject) => <AddressDisplay {...nestedObject} />
    }
}
```
In fact, if you're trying to render data with nested objects in one of these tables, you'll *have to do something like this*, otherwise you'll get the **"Objects are not valid React children..."** error. Columns with nested object formatters aren't sortable yet. 