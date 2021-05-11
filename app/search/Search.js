import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            requested: false
        }
    }

    searchItem(event) {
        event.preventDefault();

        if(this.state.query.length > 0 && this.state.requested == false) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function(){
                if(request.readyState === XMLHttpRequest.DONE) {
                    const status = request.status;

                    if(status === 0 || (status >= 200 && status < 400)) {
                        this.props.addItem(request.responseText);
                    } else {
                        this.props.addItem("notFound");
                    }
                    this.setState({requested: false});

                }
            }.bind(this);

            request.open("GET", "https://www.dnd5eapi.co/api/equipment/" + this.state.query);
            request.send();
        }
    }

    updateQuery(event) {
        this.setState({query: event.target.value});
    }

    render() {
        return (
            <div className="search-area">
                <form className="search" onSubmit={() => this.searchItem(event)}>
                    <label htmlFor="search-bar">
                        Search for Item
                    </label>
                    <input value={this.state.query} onChange={() => this.updateQuery(event)} id="search-bar" type="search"/>
                    <input type="submit" value="Add Item"/>
                </form>
            </div>
        )
    }
}

export default Search;
