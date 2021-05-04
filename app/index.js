import React from 'react';
import ReactDOM from 'react-dom';

import Search from './search/Search.js';

class App extends React.Component {
    render() {
        return (
            <main>
                <Search />
                <p> test thanks </p>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
