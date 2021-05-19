import React, { Component } from 'react';

import Search from './../search/Search.js';
import CustomItem from './../customItem/CustomItem.js';

import "./../commonStyles/expand.scss";
import "./styles.scss";

class ItemController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        }
    }

    addItem(item) {
        this.props.addItem(item);
    }

    toggleExpansion() {
        this.setState({ expanded : !this.state.expanded });
    }

    render() {
        let expanded = this.state.expanded ? "section expanded" : "section";
        let expandedButton = this.state.expanded ? "-" : "+";
        let expandAria = this.state.expanded ? "Collapse Items section" : "Expand Items section";

        return(
            <div className="item-controller">
                <h1>
                    <button className="expand-button" onClick={() => this.toggleExpansion()} aria-label={expandAria}>
                        Items
                        <span>{expandedButton}</span>
                    </button>
                </h1>
                <div className={expanded} aria-expanded={this.state.expanded}>
                    <p>Search the D&D Item API or add your own item</p>

                    <h2>Search for an Item</h2>
                    <Search addItem={(item) => this.addItem(item)}/>

                    <h2>Add an Item</h2>
                    <CustomItem addItem={(item) => this.addItem(item)}/>
                </div>
            </div>
        );
    }
}

export default ItemController;
