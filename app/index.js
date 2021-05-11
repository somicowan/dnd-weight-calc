import React from 'react';
import ReactDOM from 'react-dom';

import Search from './search/Search.js';
import Item from "./item/Item.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            weightTotal: "0 lb",
            statusMessage: ""
        }
    }

    addItem(item) {
        if(item == "notFound") {
            this.setState({statusMessage: "Item not found"});
        } else {
            let itemObj;

            itemObj = JSON.parse(item);
            const index = itemObj.index;

            const foundItemIndex = this._findItemIndex(index);

            if(foundItemIndex > -1) {
                const newItemList = this.state.items;
                newItemList[foundItemIndex].quantity += 1;
                this.setState({ items: newItemList });
            } else {
                itemObj.quantity = 1;
                this.setState({items: this.state.items.concat(itemObj)});
            }

            this.setState({statusMessage: itemObj.name + " added."});

            this._calculateWeight();
        }
    }

    updateQuantity(itemIndex, newQuantity) {
        const foundItemIndex = this._findItemIndex(itemIndex);
        if(foundItemIndex > -1) {
            const newItemList = this.state.items;
            newItemList[foundItemIndex].quantity = newQuantity;
            this.setState({ items: newItemList });
        }
        this._calculateWeight();
    }

    deleteItem(itemIndex) {
        const foundItemIndex = this._findItemIndex(itemIndex);
        if(foundItemIndex > -1) {
            const newItemList = this.state.items;
            const item = this.state.items[foundItemIndex].name;

            newItemList.splice(foundItemIndex, 1);
            this.setState({
                items: newItemList,
                statusMessage: item + " removed"
            });
        }

        this._calculateWeight();
    }

    _calculateWeight() {
        let newWeight = 0;

        for(let i = 0; i < this.state.items.length; i++) {
            newWeight += (this.state.items[i].weight) * (this.state.items[i].quantity);
        }

        this.setState({ weightTotal: newWeight + " lb"});
    }

    _findItemIndex(indexToSearch) {
        for(let i = 0; i < this.state.items.length; i++) {
            if(this.state.items[i].index == indexToSearch) {
                return i;
            }
        }

        return -1;
    }

    render() {
        let itemList = this.state.items.map(item => {
            return <Item key={item.index}
                         id={item.index}
                         name={item.name}
                         weight={item.weight}
                         cost={item.cost.quantity + " " + item.cost.unit}
                         quantity={item.quantity}
                         updateQuantity={(itemIndex, newQuantity) => this.updateQuantity(itemIndex, newQuantity)}
                         deleteItem={(itemIndex) => this.deleteItem(itemIndex)}/>
        });

        return (
            <main>
                <div className="search">
                    <h1>Search for an Item</h1>
                    <Search addItem={(item) => this.addItem(item)}/>
                </div>
                <span aria-live="polite" className="status-message">{this.state.statusMessage}</span>
                <div className="bag">
                    <h1>Currently in the Bag</h1>
                    { itemList }
                </div>
                <div className="weight-total">
                    <h1>Total Weight</h1>
                    { this.state.weightTotal }
                </div>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
