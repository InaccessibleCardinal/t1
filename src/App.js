import React from 'react';
import {users} from './data/users';
import {albums} from './data/albums';
import SortableTable from './Table';

const config = {
    headers: [{value: 'albumId'}, {value: 'title'}, {value: 'id'}, {value: 'url'}, {value: 'thumbnailUrl'}],
    rows: albums.slice(0, 50),
    className: 'my-table',
    formatters: {
        albumId: (id) => <span>{id}:</span>,
        thumbnailUrl: (url) => <Thumbnail src={url} />
    },
    isSortable: true,
    total: {totalColumns: ['albumId', 'id']}
};

const config2 = {
    headers: [{value: 'id'}, {value: 'name'}, {value: 'email'}],
    rows: users
};

export default function App() {
    return (
        <div className="App">
            <SortableTable {...config} />
            <SortableTable {...config2} />
        </div>
    );
}

//example
function Thumbnail({src}) {
    return (
        <img src={src} alt="" width="100" />
    );
}