import React, { Component } from "react";
import Meteor from "meteor/meteor";
import "./CartSummary.css";

class CartSummary extends Component {
  render() {
    const { total } = this.props;
    return (
      <div className="cart-summary">
        <h2 className="cart-summary-title">Carrinho</h2>
        <h2 className="cart-summary-total">
          Total: R$
          {total}
        </h2>
      </div>
    );
  }
}

export default CartSummary;
