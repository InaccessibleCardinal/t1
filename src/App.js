import React from 'react';
import {users} from './data/users';
import SortableTable from './Table';

const config = {
    headers: Object.keys(users[0]).map(value => {
        return {value} 
    }),
    rows: users,
    isSortable: true,
    className: 'my-table'
};

let users2 = JSON.parse(JSON.stringify(users));

function SampleComponent({v}) {
  return (
    <div>
      <p>sample component</p>
      <p>{v}</p>
    </div>
  )
}

users2.forEach((u) => {
    u.email = <SampleComponent v={u.email} />;
});

let config2 = {
  headers: Object.keys(users2[0]).map(value => {
    return {value} 
  }),
  rows: users2,
  isSortable: true
}

const data3 = [
  {propertyA: 100, propertyB: 22, propertyC: 1, propertyD: 'Astring'},
  {propertyA: 33, propertyB: 22, propertyC: 1, propertyD: '0string'},
  {propertyA: 111, propertyB: 22, propertyC: 1, propertyD: 'string'},
  {propertyA: 121, propertyB: 22, propertyC: 1, propertyD: 'string00'},
  {propertyA: 23, propertyB: 22, propertyC: 1, propertyD: 'qstring'},
  {propertyA: 455, propertyB: 22, propertyC: 1, propertyD: '4string'},
  {propertyA: 43, propertyB: 22, propertyC: 1, propertyD: '3string'},
  {propertyA: 4, propertyB: 22, propertyC: 1, propertyD: 'string33'},
  {propertyA: 6, propertyB: 22, propertyC: 1, propertyD: 'string11'},
  {propertyA: 77, propertyB: 22, propertyC: 1, propertyD: 'string1'},
  {propertyA: 99, propertyB: 22, propertyC: 1, propertyD: 'string'}
];

const config3 = {
  headers: [
    {displayValue: 'Property A', value: 'propertyA'}, 
    {displayValue: 'Property B', value: 'propertyB'}, 
    {displayValue: 'Property C', value: 'propertyC'}, 
    {displayValue: 'Property D', value: 'propertyD'}
  ],
  rows: data3,
  isSortable: true,
  className: 'my-table'
}

const config4 = {
  headers: [{value: 'a', displayValue: 'A:'}, {value: 'b', displayValue: 'B:'}],
  rows: [
    {a: 'abc', b: 'xyz'}, 
    {a: 'abc', b: '111'}, 
    {a: 'aaa', b: 'xzz'},
    {a: 'bbb', b: 'yyy'},
    {a: 'abc', b: '32e'},
    {a: 'abc', b: 'ff4'},
    {a: 'cba', b: '999'},
    {a: 'a66bc', b: 'xyz'}, 
    {a: 'abc', b: '111'}, 
    {a: 'araa', b: 'xzz'},
    {a: 'bbrb', b: 'yyy'},
    {a: 'abc', b: '32e'},
    {a: 'afbc', b: 'ff4'},
    {a: 'cdba', b: '999'},
    {a: 'dabc', b: 'hxyz'}, 
    {a: 'abc6', b: 'r111'}, 
    {a: 'aaa99', b: 'zxzz'},
    {a: 'bbb', b: 'yyy'},
    {a: 'abc', b: '32e'},
    {a: 'asbc', b: 'zff4'},
    {a: 'cbsa', b: 'x999'}
  ],
  isSortable: true,
  formatting: {
    a: (v) => <h1>{v}</h1>
  }
}



function App() {
    return (
        <div className="App">
            <SortableTable config={config} />
            <SortableTable config={config2} />
            <SortableTable config={config3} />
            <SortableTable config={config4} />
            {/*<SortableTable config={config5} />*/}
        </div>
    );
}

export default App;