import React, { Component } from 'react';

import './searchStyle.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            requested: false,
            searchList: [],
            foundList: []
        }

        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE) {
                const status = request.status;

                if(status === 0 || (status >= 200 && status < 400)) {
                    const itemList = JSON.parse(request.responseText).results;
                    const itemNameAndIndexOnly = itemList.map(item => {
                        return item.index + "|" + item.name;
                    });
                    this.setState({searchList: itemNameAndIndexOnly});
                }
            }
        }.bind(this);

        request.open("GET", "https://www.dnd5eapi.co/api/equipment/");
        request.send();
    }

    getItemInfo(itemIndex) {
        if(this.state.requested == false) {
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

            request.open("GET", "https://www.dnd5eapi.co/api/equipment/" + itemIndex);
            request.send();
        }
    }

    updateQuery(event) {
        this.setState({query: event.target.value});

        if(event.target.value.length > 2) {
            let newFoundList = [];
            for(var i=0; i < this.state.searchList.length; i++) {
                if(this.state.searchList[i].includes(event.target.value)) {
                    newFoundList.push(this.state.searchList[i]);
                }
            }

            this.setState({foundList: newFoundList});
        } else {
            this.setState({foundList: [] });
        }
    }

    render() {
        let autosearch = this.state.foundList.map(item => {
            const fullItemInfo = item.split("|");
            const index = fullItemInfo[0];
            const name = fullItemInfo[1];
            const ariaLabel = "Add " + name + " to Bag";
            return(
                <div key={index} className="autosearch-item">
                    {name}
                    <button aria-label={ariaLabel} onClick={() => this.getItemInfo(index)}>Add</button>
                </div>
            );
        });

        return (
            <div className="search-area">
                <label className="sr-only" htmlFor="search-bar">
                    Search for Item
                </label>
                <input value={this.state.query} onChange={() => this.updateQuery(event)} id="search-bar" type="search"/>

                <p aria-live="polite" className="search-status">
                    {this.state.foundList.length > 0 ? this.state.foundList.length + " item(s) found." : ""}
                </p>
                {autosearch}
            </div>
        )
    }
}

export default Search;
