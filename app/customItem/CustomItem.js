import React, { Component } from "react";

import "./styles.scss";

class CustomItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            weight: 0,
            costQuantity: 0,
            costUnit: "cp",
            quantity: 0,
            status: ""
        }
    }
    addItem() {
        if(this.state.name != "" && this.state.weight != "" && this.state.costQuantity != "" && this.state.quantity != "" && this.state.costUnit != "") {
            const indexName = this.state.name.split(" ").join("-");
            let input = this.state;
            input.index = indexName;
            input.cost = {
                quantity: this.state.costQuantity,
                unit: this.state.costUnit
            };
            this.setState({ status: "" });

            this.props.addItem(JSON.stringify(input));
        } else {
            this.setState({ status: "Error: Missing or incorrect input for custom item."});
        }
    }

    updateState(event, stateKey) {
        this.setState({ [stateKey]: event.target.value });
    }
    render() {

        return(
            <div className="custom-item">
                <div className="form-group">
                    <label htmlFor="custom-item-name">Name: </label>
                    <input id="custom-item-name" onChange={() => this.updateState(event, "name")} type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="custom-item-weight">Weight (in lb): </label>
                    <input id="custom-item-weight" onChange={() => this.updateState(event, "weight")} type="number"/>
                </div>
                <div className="form-group">
                    <label htmlFor="custom-item-cost">Cost: </label>
                    <input id="custom-item-cost" onChange={() => this.updateState(event, "costQuantity")} type="number"/>
                </div>
                <div className="form-group">
                    <label htmlFor="custom-item-cost-unit">Cost unit: </label>
                    <select id="custom-item-cost-unit" onChange={() => this.updateState(event, "costUnit")}>
                        <option value="cp">cp</option>
                        <option value="sp">sp</option>
                        <option value="ep">ep</option>
                        <option value="gp">gp</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="custom-item-quantity">Quantity: </label>
                    <input id="custom-item-quantity" onChange={() => this.updateState(event, "quantity")} type="number"/>
                </div>
                <div className="button-container">
                    <button onClick={() => this.addItem()}>Add Custom Item</button>
                </div>
                <p className="warning" aria-live="polite"> {this.state.status} </p>
            </div>
        )
    }
}

export default CustomItem;
