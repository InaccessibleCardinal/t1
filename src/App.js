import React from 'react';
import {users} from './data/users';
import SortableTable from './Table';

const config = {
    headers: Object.keys(users[0]).map((value, i) => {
        return {
            value, 
            displayValue: i === 0 ? `My ${value}` : value
        }
    }).reverse(),
    rows: users,
    isSortable: true,
    className: 'my-table',
    formatters: {
        name: (v) => <h4>{v}</h4>
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
    headers: Object.keys(data2[0]).map(value => {
        return {value};
    }),
    rows: data2,
    isSortable: true,
    className: 'my-table',
    formatters: {
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

