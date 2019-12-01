import React, { useCallback } from 'react';
import {users} from './data/users';
import SortableTable from './Table';

function UsernameButton({value}) {
    const f = useCallback((e) => {
        console.log('id: ', e.target.id)
    }, []);
    return (
        <div>
            <button id={value} onClick={f}>Remove</button>
        </div>
    );
}

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
    formatters: {
        name: (v) => <h4>{v}</h4>,
        username: (v) => <UsernameButton value={v} />
    }
};

function ImageComp({title, url}) {
    return (
        <div>
            <p>{title}</p>
            <img src={url} alt='' width={100} />
        </div>
    );
}

const data2 = [
    {
        name: 'sam',
        id: '1',
        pic: {"title": "pic1", "url": "https://via.placeholder.com/600/92c952"}
    },
    {
        name: 'jill',
        id: '2',
        pic: {"title": "pic2", "url": "https://via.placeholder.com/600/771796"}
    },
    {
        name: 'jo',
        id: '3',
        pic: {"title": "pic3", "url": "https://via.placeholder.com/600/24f355"}
    }

];
const config2 = {
    headers: [{value: 'pic'}, {value: 'name'},{value: 'id'}],
    rows: data2,
    isSortable: true,
    className: 'my-table',
    formatters: {
        name: (cellValue) => <button onClick={() => alert('LOL')}>{cellValue}</button>,
        pic: (v) => <ImageComp {...v} />
    }
}


function App() {
    return (
        <div className="App">
            <SortableTable {...config} />
            <SortableTable {...config2} />
        </div>
    );
}

export default App;
