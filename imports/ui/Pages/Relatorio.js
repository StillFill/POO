import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { FormControl, ControlLabel, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../Styles/Products";

class CadastroDono extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getProductName = this.getProductName.bind(this);
  }
  getProductName(productId) {
    const products = this.props.products;
    const product = products.filter(a => a._id === productId)[0];
    return product ? product.name : "Não encontrado";
  }

  render() {
    return (
      <div className="products-container">
        <div className="products-header">
          <div>Cliente</div>
          <div>Método</div>
          <div>Total</div>
        </div>
        {this.props.sales.map(sale => (
          <div className="product-row">
            <div>{sale.client_name}</div>
            <div>{sale.payment_method}</div>
            <div>R${sale.total}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default CadastroDono;

CadastroDono.propTypes = {
  products: PropTypes.array,
  sales: PropTypes.array
};
