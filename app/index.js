import React from 'react';
import ReactDOM from 'react-dom';

import Search from './search/Search.js';
import Item from "./item/Item.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            weightTotal: "0 lb"
        }
    }

    addItem(item) {
        let itemObj;
        let exists = false;

        itemObj = JSON.parse(item);
        const index = itemObj.index;

        for(let i = 0; i < this.state.items.length; i++) {
            if(this.state.items[i].index == index) {
                const newItemList = this.state.items;
                newItemList[i].quantity += 1;
                this.setState({ items: newItemList });

                exists = true;
                break;
            }
        }

        if(!exists) {
            itemObj.quantity = 1;
            this.setState({items: this.state.items.concat(itemObj)});
        }

        this.calculateWeight();
    }

    calculateWeight() {
        let newWeight = 0;

        for(let i = 0; i < this.state.items.length; i++) {
            newWeight += (this.state.items[i].weight) * (this.state.items[i].quantity);
        }

        this.setState({ weightTotal: newWeight + " lb"});
    }

    render() {
        console.log(this.state.items);
        let itemList = this.state.items.map(function(item){
            return <Item key={item.index} name={item.name} weight={item.weight} cost={item.cost.quantity + " " + item.cost.unit} quantity={item.quantity}/>
        });

        return (
            <main>
                <div className="search">
                    <h1>Search for an Item</h1>
                    <Search addItem={(item) => this.addItem(item)}/>
                </div>
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
