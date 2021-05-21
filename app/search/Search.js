import React, { Component } from 'react';

import './searchStyle.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            requested: false,
            searchList: [],
            foundList: [],
            currency: [
                {
                    index: "platinum",
                    name: "Platinum"
                },
                {
                    index: "gold",
                    name: "Gold"
                },
                {
                     index: "electrum",
                     name: "Electrum"
                },
                {
                    index: "silver",
                    name: "Silver"
                },
                {
                    index: "copper",
                    name: "copper"
                }
            ]
        }

        var request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE) {
                const status = request.status;

                if(status === 0 || (status >= 200 && status < 400)) {
                    const itemList = JSON.parse(request.responseText).results;
                    let itemNameAndIndexOnly = itemList.map(item => {
                        return item.index + "|" + item.name;
                    });

                    itemNameAndIndexOnly = itemNameAndIndexOnly.concat(this.state.currency.map(item => {
                        return item.index + "|" + item.name;
                    }));

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
                        for(var i=0; i < this.state.currency.length; i++) {
                            if(itemIndex == this.state.currency[i].index) {
                                const item = {
                                    index: this.state.currency[i].index,
                                    name: this.state.currency[i].name,
                                    weight: .05
                                }
                                this.props.addItem(JSON.stringify(item));
                            }
                        }
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

    resetInput() {
        this.setState({ query: ""});
        this.setState({foundList: [] });
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
                <input value={this.state.query} onChange={() => this.updateQuery(event)} onFocus={() => this.resetInput()} id="search-bar" type="search"/>

                <p aria-live="polite" className="search-status">
                    {this.state.foundList.length > 0 ? this.state.foundList.length + " item(s) found." : ""}
                </p>
                {autosearch}
            </div>
        )
    }
}

export default Search;
