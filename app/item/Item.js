import React, { Component } from 'react';
import './styles.scss'

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDesc: false
        }
    }
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

    toggleDesc() {
        this.setState({ showDesc: !this.state.showDesc });
    }

    render() {
        let quantityInputId = this.props.id + "-quantity";

        let descriptionBtn =  this.props.description ? <button className="desc-btn" onClick={() => this.toggleDesc()}>(See Description)</button> : "";
        let descriptionDivClass = this.state.showDesc ? "description show" : "description"
        let description =  this.props.description ? <div className={descriptionDivClass} aria-expanded={this.state.showDesc}>{this.props.description}</div>: "";

        return (
            <div className="item">
                <label htmlFor={quantityInputId} className="sr-only">Quantity</label>
                <input className="quantity" type="text" id={quantityInputId} onChange={() => this.detectChange(event)} value={this.props.quantity} />
                    <span aria-hidden="true">x</span>
                    <span className="name">
                        {this.props.name}
                        {descriptionBtn}
                    </span>
                <div className="additional-stats">
                    <span className="weight">
                        <span className="label">Weight:</span> {this.props.weight} lb
                    </span>
                </div>
                <button className="remove" onClick={() => this.detectDelete(event)}>
                    <span className="label" aria-hidden="true">X</span> Delete {this.props.name}
                </button>

                {description}
            </div>
        )
    }
}

export default Item;
