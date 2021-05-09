import React, { Component } from 'react';
import './styles.scss'

class Item extends Component {
    render() {
        return (
            <div className="item">
                Item name: {this.props.name} <br/>
                Weight: {this.props.weight} <br/>
                Cost: {this.props.cost} <br/>
                quantity: {this.props.quantity}
            </div>
        )
    }
}

export default Item;
