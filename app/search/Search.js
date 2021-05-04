import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="search">
                <label htmlFor="search-bar">
                    Search for Item
                </label>
                <input id="search-bar" type="search"/>
            </div>
        )
    }
}

export default Search;
