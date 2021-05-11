import React, { Component } from 'react';
import './styles.scss'

class Item extends Component {
    detectChange(event) {
        let value = event.target.value;
        if(value == "") {
            value = 0;
        }
        this.props.updateQuantity(this.props.id, parseInt(value));
    }

    detectDelete(event) {
        this.props.deleteItem(this.props.id);
    }

    render() {
        return (
            <div className="item">
                Item name: {this.props.name} <br/>
                Weight: {this.props.weight} <br/>
                Cost: {this.props.cost} <br/>
                quantity: <input type="text" onChange={() => this.detectChange(event)} value={this.props.quantity} />
                <button onClick={() => this.detectDelete(event)}>Delete {this.props.name} (x)</button>
            </div>
        )
    }
}

export default Item;
