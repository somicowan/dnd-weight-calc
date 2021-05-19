import React from 'react';
import ReactDOM from 'react-dom';

import ItemController from './itemController/ItemController.js';

import Search from './search/Search.js';
import Item from "./item/Item.js";
import ImportExport from "./importExport/ImportExport.js";
import CustomItem from "./customItem/CustomItem.js";

import "./mainStyle.scss";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            weightTotal: 0,
            statusMessage: "",
            strScore: 0,
            totalCapacity: 0,
            overweight: "",
            itemCollapse: false
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
                this.setState({ items: newItemList }, () => {
                    this._calculateWeight();
                });
            } else {
                if(!itemObj.quantity) {
                    itemObj.quantity = 1;
                }
                this.setState({items: this.state.items.concat(itemObj)}, () => {
                    this._calculateWeight();
                });
            }

            this.setState({statusMessage: itemObj.name + " added."});
        }
    }

    updateQuantity(itemIndex, newQuantity) {
        const foundItemIndex = this._findItemIndex(itemIndex);
        if(foundItemIndex > -1) {
            const newItemList = this.state.items;
            newItemList[foundItemIndex].quantity = newQuantity;
            const itemName = newItemList[foundItemIndex].name;
            this.setState({
                items: newItemList,
                statusMessage: ""
            }, () => {
                this._calculateWeight();
            });
        }
    }

    deleteItem(itemIndex) {
        const foundItemIndex = this._findItemIndex(itemIndex);
        if(foundItemIndex > -1) {
            const newItemList = this.state.items;
            const item = this.state.items[foundItemIndex].name;

            newItemList.splice(foundItemIndex, 1);
            this.setState({
                items: newItemList,
                statusMessage: item + " removed."
            }, () => {
                this._calculateWeight();
            });
        }
    }

    updateBag(bag) {
        this.setState({ items: JSON.parse(bag) }, () => {
            this._calculateWeight();
        });
    }

    updateTotalCapacity(event) {
        const str = event.target.value;

        this.setState({
            strScore: str,
            totalCapacity: str * 15
        }, () => {
            this._updateEncumbrance();
        });
    }

    _calculateWeight() {
        let newWeight = 0;

        for(let i = 0; i < this.state.items.length; i++) {
            newWeight += (this.state.items[i].weight ? this.state.items[i].weight : 0) * (this.state.items[i].quantity);
        }

        this.setState({ weightTotal: newWeight }, () => {
            this._updateEncumbrance();
        });
    }

    _findItemIndex(indexToSearch) {
        for(let i = 0; i < this.state.items.length; i++) {
            if(this.state.items[i].index == indexToSearch) {
                return i;
            }
        }

        return -1;
    }

    _updateEncumbrance() {
        if(this.state.weightTotal > this.state.totalCapacity) {
            this.setState({ overweight: "Over encumbered - Speed drops to 5 ft. Disadvantage on STR, DEX, or CON ability checks, attack rolls, and saving throws."});
        } else if(this.state.weightTotal > (this.state.strScore * 10) &&
                  this.state.weightTotal <= (this.state.totalCapacity)) {
            this.setState({ overweight: "Heavily encumbered - Speed drops by 20 ft. Disadvantage on STR, DEX, or CON ability checks, attack rolls, and saving throws."});
        } else if(this.state.weightTotal > (this.state.strScore * 5)) {
            this.setState({ overweight: "Encumbered - Speed drops by 10 ft."});
        } else {
            this.setState({ overweight: ""});
        }
    }

    render() {
        let itemList = this.state.items.map(item => {
            return <Item key={item.index}
                         id={item.index}
                         name={item.name}
                         weight={item.weight ? item.weight : "N/A"}
                         cost={item.cost.quantity + " " + item.cost.unit}
                         quantity={item.quantity}
                         updateQuantity={(itemIndex, newQuantity) => this.updateQuantity(itemIndex, newQuantity)}
                         deleteItem={(itemIndex) => this.deleteItem(itemIndex)}/>
        });

        return (
            <main>
                <div className="left-side">
                    <ItemController addItem={(item) => this.addItem(item)} />

                    <ImportExport bagCode={JSON.stringify(this.state.items)} updateBag={(newBag) => this.updateBag(newBag)} />
                </div>

                <div className="right-side">
                    <div className="bag">
                        <h1>Currently in the Bag</h1>
                        <p aria-live="polite" className="status-message">{this.state.statusMessage}</p>
                        { itemList }
                    </div>
                    <div className="weight-total">
                        <h1>Total Weight</h1>
                        <label htmlFor="char-str">Enter your character's character score (e.g. 18)</label>
                        <input type="text" id="char-str" onChange={() => this.updateTotalCapacity(event)}/>
                        <div className="capacity">
                            { this.state.weightTotal } / { this.state.totalCapacity } lb <br/>
                            <span className="overweight-warning">{ this.state.overweight }</span>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
