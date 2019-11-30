import React from 'react';
import {users} from './data/users';
import SortableTable from './Table';

const config = {
    headers: Object.keys(users[0]).map((value, i) => {
        return {
            value, 
            displayValue: i === 0 ? `My ${value}` : value
        }
    }),
    rows: users,
    isSortable: true,
    className: 'my-table',
    // selectiveHeaders: ['name', 'website', 'email', 'id'],
    formatting: {
        name: (v) => <h3>{v}</h3>
    }
};


function App() {
    return (
        <div className="App">
            <SortableTable {...config} />
        </div>
    );
}

export default App;